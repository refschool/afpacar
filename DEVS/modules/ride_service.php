<?php
require_once  "initialize.php";

/**
 * Class "Ride_service" / file "ride_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage ride_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Ride_service extends Initialize
{
  
  public $aResult=[];

  public $resultat;

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Ride_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */

  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function get_ride_address()
  {
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'get_ride_address.sql';
    $this->aResult = $this->oBdd->getSelectDatas($sSqlPath) ;
  }

  public function get_ride_step(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'get_ride_step.sql';
    $this->aResult = $this->oBdd->getSelectDatas($sSqlPath) ;
  }

  public function get_ride_vehicle(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'get_ride_vehicle.sql';
    $this->aResult = $this->oBdd->getSelectDatas($sSqlPath) ;
  }
  
  public function post_ride_info(){
    log::f("test", $this->VARS_HTML['comment']);
    error_log($this->VARS_HTML['comment']);
    // for ($i = 0; $i < count($this->VARS_HTML['array']); $i++) {
    //   $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'insert_trajet_test.sql';
    //     $this->resultat= $this->oBdd->treatDatas($sSqlPath, array(
    //       "city" => $this->VARS_HTML["array[$i]['city']"],
    //       "comment" => $this->VARS_HTML["array[$i]['comments']"]
    //       ));

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