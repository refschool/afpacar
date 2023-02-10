<?php
require_once  "initialize.php";

/**
 * Class "Mentions_legales_service" / file "mentions_legales_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage mentions_legales_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class info_service extends Initialize
{
  public $aOfMentionsLegales;
  public $aOfCharteDuBonConducteur;
  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Mentions_legales_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
    $this-> aOfMentionsLegales=[];
    $this-> aOfCharteDuBonConducteur=[];
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


  public function mentions_legales_list(){

    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "info_mentions_legales.sql";

    $this->aOfMentionsLegales= $this->oBdd->getSelectDatas($spathSQL, array(
      "id_page" => $this->VARS_HTML["id_page"]
      

    ));
  }


  public function charte_du_bon_conducteur(){

      $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "info_charte_du_bon_conducteur.sql";
  
      $this->aOfCharteDuBonConducteur= $this->oBdd->getSelectDatas($spathSQL, array(
        "id_page" => $this->VARS_HTML["id_page"]
        
  
      ));
    
  }
}
  

?>