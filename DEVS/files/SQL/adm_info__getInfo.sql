SELECT
    name_page AS pageName,
    content_page,
    label_page,
    datetime_creation_page,
    author_page,
    is_active_page,
    id_page
FROM page
WHERE is_active_page =1;
