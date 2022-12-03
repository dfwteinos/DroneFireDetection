<?php


function sendNotif($to, $notif)
{

    $feilds = array('to' => $to, 'notification' => $notif);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($feilds));

    $headers = array();
    $headers[] = 'Authorization: Key=<PutYourAPIKeyHere';
    $headers[] = 'Content-Type: application/json';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);
}

function base64_to_img($base64_string, $output_file)
{
    $ifp = fopen($output_file, "wb");

    $data = explode(',', $base64_string);

    fwrite($ifp, base64_decode($data[1]));
    fclose($ifp);

    return $output_file;
}

$to = "Put_Your_Post_Link_Here";

$notification = array(
    'title' => "PutYourPushNotificationTitleHere",
    'body' => "PutYourBodyMSGHere. We'll include: 1) Time, 2) Date, 3) Location, 4) Confident Score",
    'img' => $file
);

$img = $_POST['img_data'];

$file = base64_to_img($img, '/path/to/file.png');

sendNotif($to, $notification);
echo 'ImGayPleaseWorkImTired';
