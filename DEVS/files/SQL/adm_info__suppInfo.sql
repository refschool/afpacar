UPDATE `page`
SET
    `is_active_page`= 0
WHERE  id_page = "@sPageName";