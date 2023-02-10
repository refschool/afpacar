<?php
require_once  "initialize.php";

/**
 * Class "Faq_service" / file "faq_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage faq_service
 * @author @AfpaLabTeam - Youssef
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Faq_service extends Initialize
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
   * it is executed thanks to code "new Faq_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  public function getFaqUser(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'faq__getFaqUser.sql';
    $this->aResult = $this->oBdd->getSelectDatas($sSqlPath) ;
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

