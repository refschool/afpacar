INSERT INTO message( id_user__message_recipient, id_user__message_writer, content_message, datetime_sending_message, status_report_message, is_active_message) 
VALUES (@message_recipient_send, @message_writer_send, "@sendMessage", NOW(), @status, @is_active)