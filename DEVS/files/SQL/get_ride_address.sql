SELECT address.id_address, address.address_address, address.id_user
FROM address
INNER JOIN user ON address.id_user = user.id_user
WHERE address.id_user = 1;