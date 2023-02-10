SELECT `id_user`, `registration_number_user`, `birthday_date_user`, `tel_user`,`email_user`, `description_user` 
FROM `user` 
WHERE id_user = @sessionId