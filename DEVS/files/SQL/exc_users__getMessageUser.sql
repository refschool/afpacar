SELECT message.status_report_message, message.id_user__message_writer, message.id_user__message_recipient, message.id_message, message.datetime_sending_message, message.datetime_reading_message, message.content_message,user_writer.filename_photo_user AS photo_writer, user_recip.filename_photo_user AS photo_recip,
user_writer.name_user as name_writer, 
user_recip.name_user as name_recip 
FROM message
INNER JOIN user as user_writer ON user_writer.id_user = message.id_user__message_writer
INNER JOIN user as user_recip ON user_recip.id_user = message.id_user__message_recipient
WHERE (message.id_user__message_writer=3 and message.id_user__message_recipient=@id_user) or (message.id_user__message_writer=@id_user and message.id_user__message_recipient=3)
ORDER BY message.datetime_sending_message ASC