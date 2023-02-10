<?php
require_once  "initialize.php";

/**
 * Class "Adm_faq_service" / file "adm_faq_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_faq_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Notifications_user_service extends Initialize
{

  /**
   * public $resultat is used to store all datas needed for HTML Templates
   * @var array
   */
  public $resultat;

  /**
   * @var array $aResult The result of the service layer
   */
  public $aResult = [];
  
  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_faq_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function getNotifications(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'notifications_user__getNotifications.sql';
    $this->aResult["trajet_ad"] = $this->oBdd->getSelectDatas($sSqlPath) ;

    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'notifications_user__getMessage.sql';
    $this->aResult["message"] = $this->oBdd->getSelectDatas($sSqlPath) ;

    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'notifications_user__getOpinion.sql';
    $this->aResult["opinion"] = $this->oBdd->getSelectDatas($sSqlPath) ;
  }

  public function updateNotifications()
  {
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'notifications_user__updateNotifications.sql';
    $this->aResult["trajet_ad"] = $this->oBdd->getSelectDatas($sSqlPath);

    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'notifications_user__updateMessage.sql';
    $this->aResult["message"] = $this->oBdd->getSelectDatas($sSqlPath);

    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'notifications_user__updateOpinion.sql';
    $this->aResult["opinion"] = $this->oBdd->getSelectDatas($sSqlPath);
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

