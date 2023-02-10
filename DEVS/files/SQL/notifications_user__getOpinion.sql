select  user.name_user as nom_expediteur, user.firstname_user as prenom_expediteur, opinion.datetime_opinion as date_opinion, opinion.content_opinion, opinion.is_active_opinion
from opinion
inner join user on opinion.id_user__opinion_writer = user.id_user
where is_active_opinion=1 and id_user__opinion_recipient=1;