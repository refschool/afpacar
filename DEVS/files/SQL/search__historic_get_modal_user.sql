SELECT user.name_user,user.firstname_user,ad__passenger.service_contract__passenger
from ad__passenger 
inner join ad on ad.id_ad=ad__passenger.id_ad
inner join user on user.id_user=ad__passenger.id_user__passenger
inner join user as user_ad on user_ad.id_user=ad.id_user__writer
where ad.id_user__writer=@id_user and ad.id_ad=@id_ad and ad__passenger.datetime_acceptance_contract__passenger is not null 