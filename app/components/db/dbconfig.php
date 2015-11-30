<?php

// MySQLi connection dance.
if (!$_SERVER['DOCUMENT_ROOT']) {
    $_SERVER['DOCUMENT_ROOT'] = '.';
}
$configFileName = $_SERVER['DOCUMENT_ROOT'] . '/config/dbconfig.ini';
$config = parse_ini_file($configFileName);
if(!file_exists($configFileName)){
    die("DB config file does not exist at this location.");
}
$connection = mysqli_connect('localhost', $config['username'], $config['password'], $config['dbname']);
if($connection === false) {
    die('Could not connect to database.');
    //return mysqli_connect_error();
}