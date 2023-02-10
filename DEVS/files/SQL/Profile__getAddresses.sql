SELECT
    id_address AS id,
    address_address AS add_user,
    name_city AS city_user,
    zip_code_city AS cp_user,
    is_main_address AS bMainAdd
FROM address  
INNER JOIN city ON address.id_city = city.id_city 
WHERE address.id_user = @userId;