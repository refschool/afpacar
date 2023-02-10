SELECT user.name_user,user.firstname_user,ad.id_ad,ad.id_user__writer as id_user,ad.date_start_ad as date_debut ,ad.date_end_ad as date_fin ,ad.is_driver_ad,ad.content_ad,ad.are_smokers_allowed_ad as bSmoke,ad.is_luggage_allowed_ad as bLuggage,ad.are_disabled_people_allowed_ad as bHandicap,ad.comment_start_address_ad,ad.comment_end_address_ad,ad.is_active_ad,city.label_city,user.filename_photo_user,user.average_score_user
,weekday.label_weekday,weekday.time_go_weekday as aller ,weekday.time_return_weekday as retour,weekday.max_number_seats_available as seat,city.label_city as sCity
from ad
inner join user on ad.id_user__writer=user.id_user
inner join ad__city on ad.id_ad=ad__city.id_ad
inner join city on city.id_city=ad__city.id_city 
inner join weekday on ad.id_ad=weekday.id_ad


where city.id_city=@ville and  ad.date_start_ad<="@date_trajet" and ad.date_end_ad>="@date_trajet" and ad.are_smokers_allowed_ad=@bSmoke and ad.is_luggage_allowed_ad=@bLuggage and ad.are_disabled_people_allowed_ad=@bHandicap and ad.is_driver_ad=@bDriver  and is_active_ad=1 and DAYOFWEEK("@date_trajet")=weekday.num_weekday
 