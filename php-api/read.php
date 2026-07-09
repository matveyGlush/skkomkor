<?php
// Public, read-only API.
//
// Invoke modes (all GET):
//   read.php                            -> JSON list of all projects, ordered by sort_order
//   read.php?slug=<slug>                -> JSON of a single project
//   read.php?slug=<slug>&image=thumb    -> raw JPEG bytes of the thumb image
//   read.php?imageId=<id>               -> raw JPEG bytes of one gallery image

require __DIR__ . '/db.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function self_url(): string
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    return $scheme . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'];
}

function thumb_url(string $slug): string
{
    return self_url() . '?slug=' . rawurlencode($slug) . '&image=thumb';
}

function image_url_by_id(int $id): string
{
    return self_url() . '?imageId=' . $id;
}

function to_project(array $row, array $imageIds): array
{
    return [
        'id' => (int) $row['id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'tags' => json_decode($row['tags'], true),
        'description' => $row['description'],
        'sortOrder' => (int) $row['sort_order'],
        'images' => array_map(
            fn(int $id) => ['id' => $id, 'url' => image_url_by_id($id)],
            $imageIds
        ),
        'imageThumbUrl' => $row['has_thumb'] ? thumb_url($row['slug']) : null,
    ];
}

try {
    $pdo = get_pdo();
    $slug = $_GET['slug'] ?? null;
    $image = $_GET['image'] ?? null;
    $imageId = $_GET['imageId'] ?? null;

    if ($imageId !== null) {
        $stmt = $pdo->prepare('SELECT image AS data, image_mime AS mime FROM project_images WHERE id = ? LIMIT 1');
        $stmt->execute([(int) $imageId]);
        $row = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo 'Not found';
            exit;
        }

        header('Content-Type: ' . ($row['mime'] ?: 'image/jpeg'));
        header('Cache-Control: public, max-age=31536000, immutable');
        echo $row['data'];
        exit;
    }

    if ($slug !== null && $image !== null) {
        if ($image !== 'thumb') {
            http_response_code(400);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['error' => "image must be 'thumb' (use imageId for gallery images)"]);
            exit;
        }

        $stmt = $pdo->prepare('SELECT image_thumb AS data, image_thumb_mime AS mime FROM projects WHERE slug = ? LIMIT 1');
        $stmt->execute([$slug]);
        $row = $stmt->fetch();

        if (!$row || $row['data'] === null) {
            http_response_code(404);
            echo 'Not found';
            exit;
        }

        header('Content-Type: ' . ($row['mime'] ?: 'image/jpeg'));
        header('Cache-Control: public, max-age=31536000, immutable');
        echo $row['data'];
        exit;
    }

    header('Content-Type: application/json; charset=utf-8');

    if ($slug !== null) {
        $stmt = $pdo->prepare(
            'SELECT id, slug, title, tags, description, sort_order,
                    (image_thumb IS NOT NULL) AS has_thumb
             FROM projects WHERE slug = ? LIMIT 1'
        );
        $stmt->execute([$slug]);
        $row = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            exit;
        }

        $imgStmt = $pdo->prepare(
            'SELECT id FROM project_images WHERE project_id = ? ORDER BY sort_order ASC, id ASC'
        );
        $imgStmt->execute([$row['id']]);
        $imageIds = array_map('intval', array_column($imgStmt->fetchAll(), 'id'));

        echo json_encode(to_project($row, $imageIds), JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmt = $pdo->query(
        'SELECT id, slug, title, tags, description, sort_order,
                (image_thumb IS NOT NULL) AS has_thumb
         FROM projects ORDER BY sort_order ASC, id ASC'
    );
    $rows = $stmt->fetchAll();

    $imagesByProject = [];
    if ($rows) {
        $imgStmt = $pdo->query(
            'SELECT id, project_id FROM project_images ORDER BY project_id ASC, sort_order ASC, id ASC'
        );
        foreach ($imgStmt->fetchAll() as $imgRow) {
            $imagesByProject[(int) $imgRow['project_id']][] = (int) $imgRow['id'];
        }
    }

    echo json_encode(
        array_map(
            fn(array $row) => to_project($row, $imagesByProject[(int) $row['id']] ?? []),
            $rows
        ),
        JSON_UNESCAPED_UNICODE
    );
} catch (Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Internal error']);
}
