<?php
require_once  "initialize.php";

/**
 * Class "Adm_rating_service" / file "adm_rating_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_rating_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_rating_service extends Initialize
{
  public $resultat;
  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_rating_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function displayRating()
  {
    $sSqlPath = $this-> GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "display_rating.sql";
    $this->resultat= $this->oBdd->getSelectDatas($sSqlPath);
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

