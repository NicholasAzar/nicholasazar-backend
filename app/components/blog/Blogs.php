<?php
require '../db/dbconfig.php';

$blogsQuery = "SELECT *, (SELECT COUNT(1) from BLOG_POSTS WHERE BLOG_ID = b.BLOG_ID) as BLOG_POST_COUNT
               FROM BLOGS b
               WHERE b.ACTIVE_FLG = 'Y'";

$blogsResult = mysqli_query($connection, $blogsQuery);

$rows = array();
if ($blogsResult) {
    while ($row = mysqli_fetch_assoc($blogsResult)) {
        $rows[] = $row;
    }
}
echo(json_encode($rows));