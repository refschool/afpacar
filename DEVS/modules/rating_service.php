<?php
require_once  "initialize.php";

/**
 * Class "Rating_service" / file "rating_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage rating_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Rating_service extends Initialize
{

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Rating_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }




   	/**
   * method  for recover listing user admin  
   * @return $resultat
	 **/
  public function displayRating(){
    // recover datas of file usersAdmin.json 
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'display_rating.sql';
    $this->resultat= $this->oBdd->getSelectDatas($sSqlPath) ;
    //return the datas at call ajax
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

