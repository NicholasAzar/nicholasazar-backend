<?php
require '../db/dbconfig.php';

$blogPermaLink = $_POST["blogPermaLink"];
$postPermaLink = $_POST["postPermaLink"];

$blogsQuery = "SELECT BLOG_POST_TITLE, BLOG_POST_DESCRIPTION, BLOG_POST_CONTENT, bp.BLOG_POST_PERMA_LINK, bp.CREATE_DTTM
               FROM BLOG_POSTS bp, BLOGS b
               WHERE b.BLOG_ID = bp.BLOG_ID
               AND b.BLOG_PERMA_LINK = ?
               AND bp.BLOG_POST_PERMA_LINK = ?
               AND bp.ACTIVE_FLG = 'Y'
               ORDER BY bp.CREATE_DTTM DESC";

$stmt = mysqli_prepare($connection, $blogsQuery);
mysqli_stmt_bind_param($stmt, 'ss', $blogPermaLink, $postPermaLink);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $blogPostTitle, $blogPostDescription, $blogPostContent, $blogPostPermaLink, $createDttm);

$rows = array();
while (mysqli_stmt_fetch($stmt)) {
    $rows[] = array(
        "BLOG_POST_TITLE" => $blogPostTitle,
        "BLOG_POST_DESCRIPTION" => $blogPostDescription,
        "BLOG_POST_CONTENT" => $blogPostContent,
        "BLOG_POST_PERMA_LINK" => $blogPostPermaLink,
        "CREATE_DTTM" => $createDttm
    );
}
echo(json_encode($rows));
