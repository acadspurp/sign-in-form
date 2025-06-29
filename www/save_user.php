<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = [
        'name' => $_POST['name'] ?? '',
        'email' => $_POST['email'] ?? '',
        'password' => password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT),
        'street' => $_POST['street'] ?? '',
        'region' => $_POST['region'] ?? '',
        'province' => $_POST['province'] ?? '',
        'municipality' => $_POST['municipality'] ?? '',
        'barangay' => $_POST['barangay'] ?? '',
        'zip' => $_POST['zip'] ?? ''
    ];

    $file = 'users.json';

    if (!file_exists($file)) {
        file_put_contents($file, json_encode([]));
    }

    $users = json_decode(file_get_contents($file), true);
    if (!is_array($users)) {
        $users = [];
    }

    // Check if email already exists
    foreach ($users as $u) {
        if ($u['email'] === $user['email']) {
            echo json_encode(['status' => 'error', 'message' => 'Email already registered.']);
            exit;
        }
    }

    $users[] = $user;
    if (file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT))) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save user.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
