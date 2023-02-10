update address
    set id_address='@add_user',
    address_address='@city_user',
    name_city='@city_user',
    is_main_address='@main_user',
    zip_code_city='@cp_user',  
WHERE user.id_user = @userId;