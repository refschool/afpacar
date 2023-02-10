set @selectrole = (SELECT id_role FROM role WHERE name_role = '@role');

UPDATE user 
SET id_role = @selectrole 
WHERE id_user = @id_user;