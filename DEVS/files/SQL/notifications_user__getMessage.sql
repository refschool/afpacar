select  user.name_user as nom_expediteur, user.firstname_user as prenom_expediteur, message.content_message as contenu_message, message.datetime_sending_message as date_envoi_message, message.is_active_message
from message
inner join user on message.id_user__message_writer = user.id_user
where is_active_message=1 and id_user__message_recipient=1