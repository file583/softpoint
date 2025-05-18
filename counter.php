<?php
header('Content-Type: application/json');

$counterFile = 'counter_data.json';
$ip = $_SERVER['REMOTE_ADDR'];

// Инициализация файла, если его нет
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, json_encode([
        'total_views' => 0,
        'unique_ips' => []
    ]));
}

// Чтение данных
$data = json_decode(file_get_contents($counterFile), true);

// Проверяем, был ли уже этот IP
if (!in_array($ip, $data['unique_ips'])) {
    $data['unique_ips'][] = $ip;
    $data['total_views']++;
    
    // Сохраняем обновленные данные
    file_put_contents($counterFile, json_encode($data));
}

// Возвращаем данные
echo json_encode([
    'views' => $data['total_views'],
    'your_ip' => $ip
]);
?>