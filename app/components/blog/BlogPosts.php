<?php
require '../db/dbconfig.php';

$blogPermaLink = $_POST["blogPermaLink"];

$blogsQuery = "SELECT BLOG_POST_ID, b.BLOG_ID, BLOG_POST_TITLE, BLOG_POST_DESCRIPTION, BLOG_POST_CONTENT
               FROM NICHOLAS_AZAR.BLOG_POSTS bp, NICHOLAS_AZAR.BLOGS b
               WHERE b.BLOG_ID = bp.BLOG_ID
               AND b.BLOG_PERMA_LINK = ?
               AND bp.ACTIVE_FLG = 'Y'
               ORDER BY bp.CREATE_DTTM DESC";

$stmt = mysqli_prepare($connection, $blogsQuery);
if (!empty($blogPermaLink)) {
    mysqli_stmt_bind_param($stmt, $blogPermaLink);
}

mysqli_stmt_execute($stmt);
//echo(json_encode("statement executed"));

$result = mysqli_stmt_get_result($stmt);
$rows = array();
while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}
echo(json_encode($rows));
