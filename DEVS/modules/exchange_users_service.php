<?php
require_once  "initialize.php";

/**
 * Class "Exchange_users_service" / file "exchange_users_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage exchange_users_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Exchange_users_service extends Initialize
{
  /**
   * Variable php result
   */

  public $resultat;
  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Exchange_users_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  /**
   * Function to Display all messages
   */

  public function displayMessage(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'exc_users__getMessageUser.sql';
    $this->resultat = $this->oBdd->getSelectDatas($sSqlPath, array(
      "id_user"=>$this->VARS_HTML["id_user"] )) ;
  }

  /**
   * Function to display messages at first page loading
   */

  public function displayMessageLoadPage(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'exc_users__getMessageUser2.sql';
    $this->resultat = $this->oBdd->getSelectDatas($sSqlPath, array(
      "idUser"=>$this->VARS_HTML["idUser"] )) ;
  }

  /**
   * Function to add new message to display and BDD
   */

  public function addMessage(){
    if($this->VARS_HTML["sendMessage"] !=""){
      $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'exc_users__addMessage.sql';
      $this->resultat = $this->oBdd->treatDatas($sSqlPath,array(
        "sendMessage"=>$this->VARS_HTML["sendMessage"],
        "message_writer_send"=> $this-> VARS_HTML["sendMessage"]=3, //$_SESSION["userId "]
        "message_recipient_send"=>$this->VARS_HTML["message_recipient_send"],
        "status"=>$this->VARS_HTML["status"],
        "is_active"=>$this->VARS_HTML["is_active"]
      ));
    }
    else{
      $this->resultat["err_send_message"]=0;
    }    
  }

  /**
  * Function to display all users you chatting with
  */

  public function displayUsers(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'exc_users__getUser.sql';
    $this->resultat = $this->oBdd->getSelectDatas($sSqlPath);
  }

  
  public function addMesssageReport(){
    if (!empty($this->VARS_HTML["objectReport"])&&
        !empty($this->VARS_HTML["contentReport"])&&
        !empty($this->VARS_HTML["id_message_report"])&&
        !empty($this->VARS_HTML["status_report_message"])) 
    {
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'exc_users__addMessageReport.sql';
      $this->resultat = $this->oBdd->treatDatas($sSqlPath, array
      (
      "objectReport"=>$this->VARS_HTML["objectReport"],
      "contentReport"=> $this-> VARS_HTML["contentReport"],
      "id_message_report"=>$this->VARS_HTML["id_message_report"],
      "status_report_message"=>$this->VARS_HTML["status_report_message"],
      
      ));
      $this->resultat["error"]=1;

    }

    else {
      $this->resultat["error"]=0;
    }
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

