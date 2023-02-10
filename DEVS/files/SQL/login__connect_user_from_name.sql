SELECT
 `id_user` AS userId,
 `id_center` AS centerId,
 `user_name` AS userName,
 `user_firstname` AS userFirstName,
 `user_mail` AS userEmail,
 `user_identifier` AS userIdentifier,
 `user_phoneNumber` AS userPhoneNumber,
 -- `user_pwd` AS userPassword,
 `user_role` AS userRole,
 `user_date_last_connection` AS userLastConnexionDatetime,
 -- `user_validation_code` AS userValidationCode,
 `user_gender` AS userGender,
 `user_status` AS userStatus
FROM `user`
WHERE `user_name` LIKE "@userName";