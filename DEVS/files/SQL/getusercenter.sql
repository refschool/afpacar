SELECT center.name_center 
FROM center
INNER JOIN user on user.id_center = center.id_center
WHERE user.id_user = @id_user__passenger