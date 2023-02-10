<?php
require_once  "initialize.php";

/**
 * Class "Adm_exchange_users_service" / file "adm_exchange_users_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_exchange_users_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_exchange_users_service extends Initialize
{

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_exchange_users_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function getMessage(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'exchange_users__getMessage.sql';
    return  $this->oBdd->getSelectDatas($sSqlPath) ;
  }

  public function addMessage()
  {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "exchange_users__addMessage.sql";
		return $this->oBdd->treatDatas(
      $spathSQL,
      array(
        "question_summernote"=>$this->VARS_HTML["question_summernote"], "reponse_summernote"=>$this->VARS_HTML["reponse_summernote"],
        "id_center"=>+$_SESSION["centerId"]
      ),
      1
    );
  }  
  /**
   * Destructor :
   * 
   * it destroys the instance of this class
   * and it executes the code present in this function
   */
  public function __destruct()
  {
    // call parent destructor
    parent::__destruct();
  }

}
  

?>

