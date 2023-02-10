SELECT
address.id_city as id_city_depart, city.label_city as label_city_depart, ad__city.id_city as id_city_etape, 
city_etape.label_city as label_city_etape, ad__city.comment_stage
from ad
inner join ad__city on ad__city.id_ad=ad.id_ad
inner join address on address.id_address=ad.id_address__start
inner join city on city.id_city=address.id_city
inner join city as city_etape on city_etape.id_city=ad__city.id_city
where ad.id_ad=@id_ad
order by ad__city.index_stage

 