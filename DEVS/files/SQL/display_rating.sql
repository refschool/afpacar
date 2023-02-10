SELECT opinion.id_user__opinion_writer, opinion.id_user__opinion_recipient, opinion.datetime_report_opinion, opinion.subject_report_opinion, opinion.reason_report_opinion,
user_writer.name_user as name_writer, 
user_recip.name_user as name_recip 
FROM opinion
INNER JOIN user as user_writer ON user_writer.id_user = opinion.id_user__opinion_writer
INNER JOIN user as user_recip ON user_recip.id_user = opinion.id_user__opinion_recipient
WHERE opinion.subject_report_opinion IS NOT null OR opinion.reason_report_opinion IS NOT null