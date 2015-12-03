<?php
require '../db/dbconfig.php';

$blogPermaLink = $_POST["blogPermaLink"];

$blogsQuery = "SELECT *, (SELECT COUNT(1) from BLOG_POSTS WHERE BLOG_ID = b.BLOG_ID) as BLOG_POST_COUNT
               FROM BLOGS b
               WHERE b.ACTIVE_FLG = 'Y'
               AND BLOG_PERMA_LINK = ?";

$stmt = mysqli_prepare($connection, $blogsQuery);
mysqli_stmt_bind_param($stmt, 's', $blogPermaLink);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $blogId, $blogTitle, $blogDescription, $blogInformation, $newBlogPermaLink, $createDttm, $updateDttm, $activeFlg, $blogPostCount);

$rows = array();
while (mysqli_stmt_fetch($stmt)) {
    $rows[] = (object)array(
        "BLOG_ID" => $blogId,
        "BLOG_TITLE" => $blogTitle,
        "BLOG_DESCRIPTION" => $blogDescription,
        "BLOG_INFORMATION" => $blogInformation,
        "BLOG_PERMA_LINK" => $newBlogPermaLink,
        "CREATE_DTTM" => $createDttm,
        "UPDATE_DTTM" => $updateDttm,
        "ACTIVE_FLG" => $activeFlg,
        "BLOG_POST_COUNT" => $blogPostCount
    );
}
echo(json_encode($rows));