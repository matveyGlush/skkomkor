<?php
// Public contact-form endpoint. POST { name, contact, message } (all
// strings) and it emails the submission to CONTACT_TO_EMAIL below. No
// password required — this is meant to be called from the public site's
// contact form via the Next.js /api/contact route.

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

define('CONTACT_TO_EMAIL', 'glushkomat@yandex.ru');

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

$name = trim((string) ($body['name'] ?? ''));
$contact = trim((string) ($body['contact'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($name === '' || $contact === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid submission']);
    exit;
}

// mail() headers are newline-delimited, so a header injection attempt would
// smuggle extra headers in via a field containing "\r\n" — strip those.
function single_line(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

$name = single_line($name);
$contact = single_line($contact);

$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$domain = preg_replace('/^www\./', '', $host);
$fromEmail = 'noreply@' . $domain;

$subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта: ' . $name) . '?=';

$textBody = "Имя: {$name}\n"
    . "Телефон/e-mail: {$contact}\n\n"
    . "Сообщение:\n{$message}\n";

$headers = "From: {$domain} <{$fromEmail}>\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n";

if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: {$contact}\r\n";
}

$sent = mail(CONTACT_TO_EMAIL, $subject, $textBody, $headers);

if (!$sent) {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to send']);
    exit;
}

echo json_encode(['ok' => true]);
