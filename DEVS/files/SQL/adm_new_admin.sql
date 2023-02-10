set @id_function = (SELECT id_function FROM function WHERE name_function = '@name_functions' );
set @id_role = (SELECT id_role FROM role WHERE name_role = '@name_role' );

INSERT INTO `user`(`id_center`, `id_function`, `id_role`, `name_user`,
                     `firstname_user`, `gender_user`, `email_user`, 
                     `tel_user`, `hash_user`, `registration_number_user`,
                      `registration_datetime_user`,`is_active_user`) 

VALUES (@id_center,@id_function,@id_role,'@name_user','@firstname_user',
        '@gender_user','@email_user','@tel_user','@hash_user',
        '@registration_number_user',DATE(NOW()),@is_active_user)




