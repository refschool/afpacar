SELECT user.name_user, user.firstname_user, ad.date_start_ad, ad__passenger.isNotif
FROM ad__passenger
inner join user on ad__passenger.id_user__passenger = user.id_user
inner join ad on ad__passenger.id_ad = ad.id_ad
where ad__passenger.isNotif=1