SELECT vehicule.id_vehicule, vehicule.brand_vehicule, vehicule.model_vehicule, vehicule.color_vehicule, user.id_user
FROM vehicule
INNER JOIN user ON vehicule.id_user = 1
WHERE user.id_user = 1