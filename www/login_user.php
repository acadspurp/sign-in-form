<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $file = 'users.json';

    if (!file_exists($file)) {
        echo json_encode(['status' => 'error', 'message' => 'User database not found.']);
        exit;
    }

    $users = json_decode(file_get_contents($file), true);
    if (!is_array($users)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid user database format.']);
        exit;
    }

    foreach ($users as $user) {
        if ($user['email'] === $email) {
            if (password_verify($password, $user['password'])) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Incorrect password.']);
            }
            exit;
        }
    }

    echo json_encode(['status' => 'error', 'message' => 'Email not registered.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
