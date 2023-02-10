update question 
set content_question='@question_summernote', content_response='@reponse_summernote', id_center=@id_center, datetime_question=NOW() where id_question=@iIndiceQuestion