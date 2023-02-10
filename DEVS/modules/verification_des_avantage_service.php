<?php
require_once  "initialize.php";

/**
 * Class "Verification_des_avantage_service" / file "verification_des_avantage_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Verification_des_avantage_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Verification_des_avantage_service extends Initialize
{

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Verification_des_avantage_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
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

   	/**
     * liste admin for a datatable  
     * @return $jResult
	 **/
  public function getUserRides($fakesession){
    // recover datas of file usersAdmin.json 
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'liste_verification_avantage.sql';
    return  $this-> oBdd -> getSelectDatas($sSqlPath, array(
      "fake_session" => $fakesession
    )) ;
    //return the datas at call ajax
    // echo implode('|',$datas);    

 }


 public function getUserCenter($id_user__passenger){
  // recover datas of file usersAdmin.json 
  $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'getusercenter.sql';
  return  $this-> oBdd -> getSelectDatas($sSqlPath, array(
    "id_user__passenger" => $id_user__passenger
  )) ;
  //return the datas at call ajax
  // echo implode('|',$datas);    
  }
}
  

?>

