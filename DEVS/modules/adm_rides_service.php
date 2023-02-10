<?php
require_once  "initialize.php";

/**
 * Class "Adm_rides_service" / file "adm_rides_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_rides_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_rides_service extends Initialize
{

  /**
   * @var array $aResult The result of the service layer
   */
  public $aResult = [];

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_rides_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function moderation()
  {

    
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_rides_moderation.sql';
    $this->aResult = $this-> oBdd -> getSelectDatas($sSqlPath) ;
 
  }

 public function adm_moderator()
 {
  $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_rides_moderator.sql';
  $this->aResult = $this->oBdd->treatDatas($sSqlPath, array(
    "status_report_ad" => $this->VARS_HTML["status_report_ad"],
    "id_ad" => $this->VARS_HTML["id_ad"],
    "subject_report_ad" =>$this->VARS_HTML["subject_report_ad"]
    ));
    
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

