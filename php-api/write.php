<?php
// Admin write API. Every request is POST with a JSON body that must include
// the admin password; requests with a wrong/missing password get a 401.
// The password never lives in the Next.js admin page's source — the admin
// types it in at login time and it's only checked here.
//
// Body shape (all actions):
//   { "password": "...", "action": "ping" | "create" | "update" | "delete", ... }
//
// action "create": { slug, title, tags: string[], description, sortOrder,
//                     images?: { base64, mime? }[],
//                     imageThumb?: base64, imageThumbMime? }
// action "update": same as create, plus required "id". "images", if present,
//                  fully replaces the gallery — each entry is either
//                  { keepId } (an existing image to keep, by id) or
//                  { base64, mime? } (a new image to add). Omit "images"
//                  entirely to leave the gallery untouched. "imageThumb" is
//                  optional too — omit to keep the existing stored thumb.
// action "delete": { id }

require __DIR__ . '/db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

if (!isset($body['password']) || !hash_equals(ADMIN_PASSWORD, (string) $body['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid password']);
    exit;
}

$pdo = get_pdo();
$action = $body['action'] ?? null;

function insert_gallery_images(PDO $pdo, int $projectId, array $images): void
{
    $stmt = $pdo->prepare(
        'INSERT INTO project_images (project_id, image, image_mime, sort_order) VALUES (?, ?, ?, ?)'
    );
    $index = 0;
    foreach ($images as $img) {
        if (empty($img['base64'])) continue;
        $stmt->execute([
            $projectId,
            base64_decode($img['base64']),
            $img['mime'] ?? 'image/jpeg',
            $index,
        ]);
        $index++;
    }
}

function sync_gallery_images(PDO $pdo, int $projectId, array $images): void
{
    $keepIds = [];
    foreach ($images as $img) {
        if (!empty($img['keepId'])) $keepIds[] = (int) $img['keepId'];
    }

    if ($keepIds) {
        $placeholders = implode(',', array_fill(0, count($keepIds), '?'));
        $del = $pdo->prepare("DELETE FROM project_images WHERE project_id = ? AND id NOT IN ($placeholders)");
        $del->execute(array_merge([$projectId], $keepIds));
    } else {
        $del = $pdo->prepare('DELETE FROM project_images WHERE project_id = ?');
        $del->execute([$projectId]);
    }

    $updateOrder = $pdo->prepare('UPDATE project_images SET sort_order = ? WHERE id = ? AND project_id = ?');
    $insertImg = $pdo->prepare(
        'INSERT INTO project_images (project_id, image, image_mime, sort_order) VALUES (?, ?, ?, ?)'
    );

    $index = 0;
    foreach ($images as $img) {
        if (!empty($img['keepId'])) {
            $updateOrder->execute([$index, (int) $img['keepId'], $projectId]);
            $index++;
        } elseif (!empty($img['base64'])) {
            $insertImg->execute([$projectId, base64_decode($img['base64']), $img['mime'] ?? 'image/jpeg', $index]);
            $index++;
        }
    }
}

try {
    switch ($action) {
        case 'ping':
            echo json_encode(['ok' => true]);
            break;

        case 'create': {
            $slug = $body['slug'] ?? null;
            $title = $body['title'] ?? null;
            $tags = $body['tags'] ?? null;
            $description = $body['description'] ?? null;
            $images = is_array($body['images'] ?? null) ? $body['images'] : [];

            if (!$slug || !$title || !is_array($tags) || !is_string($description)) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                break;
            }

            $imageThumb = !empty($body['imageThumb']) ? base64_decode($body['imageThumb']) : null;

            try {
                $stmt = $pdo->prepare(
                    'INSERT INTO projects
                       (slug, title, tags, description, image_thumb, image_thumb_mime, sort_order)
                     VALUES (?, ?, ?, ?, ?, ?, ?)'
                );
                $stmt->bindValue(1, $slug);
                $stmt->bindValue(2, $title);
                $stmt->bindValue(3, json_encode($tags, JSON_UNESCAPED_UNICODE));
                $stmt->bindValue(4, $description);
                $stmt->bindValue(5, $imageThumb, $imageThumb !== null ? PDO::PARAM_LOB : PDO::PARAM_NULL);
                $stmt->bindValue(6, $imageThumb !== null ? ($body['imageThumbMime'] ?? 'image/jpeg') : null);
                $stmt->bindValue(7, isset($body['sortOrder']) ? (int) $body['sortOrder'] : 0, PDO::PARAM_INT);
                $stmt->execute();

                $projectId = (int) $pdo->lastInsertId();
                insert_gallery_images($pdo, $projectId, $images);

                http_response_code(201);
                echo json_encode(['ok' => true, 'id' => $projectId]);
            } catch (PDOException $e) {
                if ($e->getCode() === '23000') {
                    http_response_code(409);
                    echo json_encode(['error' => 'A project with this slug already exists']);
                } else {
                    throw $e;
                }
            }
            break;
        }

        case 'update': {
            $id = $body['id'] ?? null;
            $slug = $body['slug'] ?? null;
            $title = $body['title'] ?? null;
            $tags = $body['tags'] ?? null;
            $description = $body['description'] ?? null;

            if (!$id || !$slug || !$title || !is_array($tags) || !is_string($description)) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                break;
            }

            $id = (int) $id;

            $fields = ['slug = ?', 'title = ?', 'tags = ?', 'description = ?', 'sort_order = ?'];
            $values = [
                $slug,
                $title,
                json_encode($tags, JSON_UNESCAPED_UNICODE),
                $description,
                isset($body['sortOrder']) ? (int) $body['sortOrder'] : 0,
            ];

            if (!empty($body['imageThumb'])) {
                $fields[] = 'image_thumb = ?';
                $fields[] = 'image_thumb_mime = ?';
                $values[] = base64_decode($body['imageThumb']);
                $values[] = $body['imageThumbMime'] ?? 'image/jpeg';
            }

            $values[] = $id;

            try {
                $stmt = $pdo->prepare('UPDATE projects SET ' . implode(', ', $fields) . ' WHERE id = ?');
                $stmt->execute($values);

                if ($stmt->rowCount() === 0) {
                    // rowCount() is 0 both when the id doesn't exist and when
                    // it exists but nothing actually changed — disambiguate.
                    $check = $pdo->prepare('SELECT id FROM projects WHERE id = ?');
                    $check->execute([$id]);
                    if (!$check->fetch()) {
                        http_response_code(404);
                        echo json_encode(['error' => 'Not found']);
                        break;
                    }
                }

                if (array_key_exists('images', $body) && is_array($body['images'])) {
                    sync_gallery_images($pdo, $id, $body['images']);
                }

                echo json_encode(['ok' => true]);
            } catch (PDOException $e) {
                if ($e->getCode() === '23000') {
                    http_response_code(409);
                    echo json_encode(['error' => 'A project with this slug already exists']);
                } else {
                    throw $e;
                }
            }
            break;
        }

        case 'delete': {
            $id = $body['id'] ?? null;
            if (!$id) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing id']);
                break;
            }

            $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ?');
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Not found']);
                break;
            }

            echo json_encode(['ok' => true]);
            break;
        }

        default:
            http_response_code(400);
            echo json_encode(['error' => 'Unknown action']);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal error']);
}
