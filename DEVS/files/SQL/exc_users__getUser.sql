SELECT DISTINCT message.id_user__message_recipient, user_recip.filename_photo_user,
user_writer.firstname_user as name_writer, 
user_recip.firstname_user as name_recip
FROM message
INNER JOIN user as user_writer ON user_writer.id_user = message.id_user__message_writer
INNER JOIN user as user_recip ON user_recip.id_user = message.id_user__message_recipient
WHERE (message.id_user__message_writer=3 OR message.id_user__message_recipient=3) 
