DROP TABLE nichhlnr_main.BLOGS;
CREATE TABLE nichhlnr_main.BLOGS (
  BLOG_ID          INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
  BLOG_TITLE       VARCHAR(100)   NOT NULL,
  BLOG_DESCRIPTION VARCHAR(500)   NOT NULL,
  BLOG_INFORMATION VARCHAR(50000) NOT NULL,
  BLOG_PERMA_LINK  VARCHAR(50)    NOT NULL UNIQUE,
  CREATE_DTTM      TIMESTAMP               DEFAULT 0,
  UPDATE_DTTM      TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ACTIVE_FLG       VARCHAR(1)              DEFAULT 'Y'
);

DROP TABLE nichhlnr_main.BLOG_POSTS;
CREATE TABLE nichhlnr_main.BLOG_POSTS (
  BLOG_POST_ID          INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
  BLOG_ID               INT            NOT NULL,
  BLOG_POST_TITLE       VARCHAR(100)   NOT NULL,
  BLOG_POST_DESCRIPTION VARCHAR(500)   NOT NULL,
  BLOG_POST_CONTENT     VARCHAR(50000) NOT NULL,
  BLOG_POST_PERMA_LINK  VARCHAR(50)    NOT NULL UNIQUE,
  CREATE_DTTM           TIMESTAMP               DEFAULT 0,
  UPDATE_DTTM           TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ACTIVE_FLG            VARCHAR(1)              DEFAULT 'Y'
);

SELECT *
FROM BLOGS;
SELECT *
FROM BLOG_POSTS;

INSERT INTO nichhlnr_main.BLOGS (BLOG_TITLE, BLOG_DESCRIPTION, BLOG_PERMA_LINK, BLOG_INFORMATION, CREATE_DTTM)
VALUES ('My First Blog', 'Some place to hold my posts while I find out what I''m using this for', 'my-first-blog',
        'In this blog I''m going to be including all my first posts that I don''t know where else to put. Read some if you get curious :)',
        NULL);
INSERT INTO nichhlnr_main.BLOG_POSTS (BLOG_ID, BLOG_POST_TITLE, BLOG_POST_DESCRIPTION, BLOG_POST_CONTENT, BLOG_POST_PERMA_LINK, CREATE_DTTM)
VALUES (1, 'My First Post!', 'Hello World! Finally got a blog going... This is exciting!!',
        'What is special about this post is that it''s my first. Now to those who don''t care, I don''t blame you.
        What I want is for this post to be an example of what _can be done_.',
        'my-first-post', NULL);
COMMIT;