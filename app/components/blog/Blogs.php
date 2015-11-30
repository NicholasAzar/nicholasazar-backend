<?php
require '../db/dbconfig.php';

$blogsQuery = "SELECT *
               FROM BLOGS
               WHERE ACTIVE_FLG = 'Y'";

$blogsResult = mysqli_query($connection, $blogsQuery);

$rows = array();
if ($blogsResult) {
    while ($row = mysqli_fetch_assoc($blogsResult)) {
        $rows[] = $row;
    }
}
echo(json_encode($rows));