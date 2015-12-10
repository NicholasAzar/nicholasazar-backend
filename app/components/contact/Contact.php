<?php
$to  = 'contact@nicholasazar.com';

$name = $_POST["name"];
$email = $_POST["email"];
$text = $_POST["text"];

// subject
$subject = 'Contact message from: ' . $name;

// message
$message = '
<html>
<head>
  <title>Contact message received from: ' . $name . '</title>
</head>
<body>
  <p>' . $text . '</p>
  <footer>Reply to: ' . $email . '</footer>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'From: nicholasazar.com <contact@nicholasazar.com>' . "\r\n";

// Mail it
$result = array(mail($to, $subject, $message, $headers));

echo (json_encode($result));