SELECT user.name_user,user.firstname_user,ad.id_ad,ad.id_user__writer as id_user,ad.date_start_ad as date_debut ,ad.date_end_ad as date_fin,ad.is_driver_ad,ad.content_ad,ad.are_smokers_allowed_ad as bSmoke,ad.is_luggage_allowed_ad as bLuggage,ad.are_disabled_people_allowed_ad as bHandicap,ad.comment_start_address_ad,ad.comment_end_address_ad,ad.is_active_ad,address.id_city as ville,weekday.label_weekday as nom_jour,weekday.time_go_weekday as aller ,weekday.time_return_weekday as retour,weekday.max_number_seats_available as seat,city.label_city as sCity, user.average_score_user,user.filename_photo_user
from ad
inner join user on ad.id_user__writer=user.id_user
inner join address on user.id_user=address.id_user
inner join city on city.id_city=address.id_city
inner join weekday on ad.id_ad=weekday.id_ad
where ad.id_user__writer=@id_user
GROUP by weekday.num_weekday 