UPDATE message SET status_report_message=@status_report_message, datetime_report_message=NOW(),subject_report_message="@objectReport",reason_report_message="@contentReport" 
WHERE id_message=@id_message_report