<?php
require_once  "initialize.php";

/**
 * Class "Adm_notif_service" / file "adm_notif_service.php"
 *
 * This is the service layer of an ADMIN notif
 * 
 * ◘◘ Your class description here... ◘◘
 * 
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_notif_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_notif_service extends Initialize
{

  /**
   * @var array $aResult The result of the service layer
   */
  public $aResult = [];

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_notif_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this method
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function getNotifications()
  {
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_notif__getNotifications.sql';
    $this->aResult["adm_trajet"] = $this->oBdd->getSelectDatas($sSqlPath);

    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_notif__getMessage.sql';
    $this->aResult["adm_message"] = $this->oBdd->getSelectDatas($sSqlPath) ;

    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_notif__getOpinion.sql';
    $this->aResult["adm_avis"] = $this->oBdd->getSelectDatas($sSqlPath) ;
  }

  /**
   * Destructor :
   * 
   * it destroys the instance of this class
   * and it executes the code present in this method
   */
  public function __destruct()
  {
    // call parent destructor
    parent::__destruct();
  }

	// ◘◘ You can add other methods here (to make CRUD and save the result in $this->aResult) ◘◘

}
  

?>

