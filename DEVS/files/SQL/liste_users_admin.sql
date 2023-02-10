-- search in database he listing for admin
SELECT 
  user.id_user,
  user.name_user,
  user.firstname_user,
  user.email_user,
  user.registration_number_user,
  user.is_active_user,
  role.name_role
FROM user
INNER JOIN role
 ON
   user.id_role = role.id_role
 WHERE
   (role.name_role = "ROLE_SUPER_ADMIN" OR role.name_role = "ROLE_ADMIN")
 AND
   (user.is_active_user = 0 OR user.is_active_user = 1)
;