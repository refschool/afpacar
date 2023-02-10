SELECT ad.id_user__writer, city_depart.label_city
AS citydep, city_arrivee.label_city 
AS cityar, ad.is_active_ad, 
user.firstname_user, content_ad,
ad__passenger.price_contract__passenger, 
ad__passenger.service_contract__passenger, 
ad__passenger.id_user__passenger, 
ad__passenger.datetime_creation_contract__passenger,
ad__passenger.datetime_acceptance_contract__passenger
FROM ad 
INNER JOIN address as address_depart ON address_depart.id_address = ad.id_address__start 
INNER JOIN city as city_depart ON address_depart.id_city = city_depart.id_city 
LEFT JOIN (address as address_arrivee, city as city_arrivee) ON (address_arrivee.id_address = ad.id_address__end and address_arrivee.id_city = city_arrivee.id_city) INNER JOIN ad__passenger ON ad.id_ad = ad__passenger.id_ad 
INNER JOIN user ON ad__passenger.id_user__passenger = user.id_user
WHERE ad.id_user__writer = @fake_session  -- 5 --


UNION


SELECT ad.id_user__writer, city_depart.label_city 
AS citydep, city_arrivee.label_city 
AS cityar, ad.is_active_ad, 
user.firstname_user, content_ad,
ad__passenger.price_contract__passenger, 
ad__passenger.service_contract__passenger, 
ad__passenger.id_user__passenger, 
ad__passenger.datetime_creation_contract__passenger,
ad__passenger.datetime_acceptance_contract__passenger
FROM ad 
INNER JOIN address as address_depart ON address_depart.id_address = ad.id_address__start 
INNER JOIN city as city_depart ON address_depart.id_city = city_depart.id_city 
LEFT JOIN (address as address_arrivee, city as city_arrivee) ON (address_arrivee.id_address = ad.id_address__end and address_arrivee.id_city = city_arrivee.id_city) 
INNER JOIN ad__passenger ON ad.id_ad = ad__passenger.id_ad 
INNER JOIN user ON ad.id_user__writer = user.id_user
WHERE ad__passenger.id_user__passenger =  @fake_session -- 1 --