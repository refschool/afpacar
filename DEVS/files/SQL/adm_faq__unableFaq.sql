update question 
set is_active_question = (
    case
        when is_active_question=1 then 0
        when is_active_question=0 then 1
    end
)

where id_question=@iIndiceToUnable