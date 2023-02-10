SELECT id_ad, firstname_user, name_user, datetime_creation_ad, content_ad, status_report_ad, subject_report_ad, reason_report_ad 
FROM ad 
INNER JOIN user ON ad.id_ad = user.id_user