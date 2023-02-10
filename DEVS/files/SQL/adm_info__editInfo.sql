UPDATE `page`
SET
    `content_page`= "@content_page",
    `label_page`= "@label_page"
WHERE  id_page = @id_page;