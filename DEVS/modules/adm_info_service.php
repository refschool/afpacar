<?php
require_once  "initialize.php";

/**
 * Class "Adm_info_service" / file "adm_info_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage adm_info_service
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_info_service extends Initialize
{
  

  /**
   * @var array $aResult The result of the service layer
   */
  public $aResult = [];

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_info_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  
  /**
	 * public $resultat is used to store all datas needed for HTML Templates
	 * @var array
	 */
	public $resultat;

  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }


  public function getInfo(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_info__getInfo.sql';
    return  $this-> oBdd -> getSelectDatas($sSqlPath) ;
  }

 	/**
   * update eta admin for a datatable
   * 
   * @param string $sPageName The name of the page you want to delete
	 **/
  public function suppInfo(string $sPageName){
    // recover datas of file usersAdmin.json 
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_info__suppInfo.sql';
    $this->aResult = $this->oBdd->treatDatas(
      $sSqlPath,
      array(
        "is_active_page" =>$this->VARS_HTML['is_active_page'],
        "sPageName" =>$sPageName
      )
    );  
 }


 public function addInfo(){
  // recover datas of file usersAdmin.json 
  $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_info__addInfo.sql';
  $this->oBdd->treatDatas($sSqlPath, array(
    "content_page" =>$this->VARS_HTML['content_page'],
    "label_page" =>$this->VARS_HTML['label_page']
    
    ));
  
		$this->resultat["id_page_created"]= $this->oBdd->getLastInsertId();
    
  // echo implode('|',$datas);    
}
public function editInfo(){
  // recover datas of file usersAdmin.json 
  $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_info__editInfo.sql';
  $this->oBdd->treatDatas($sSqlPath, array(
    "content_page" =>$this->VARS_HTML['content_page'],
    "label_page" =>$this->VARS_HTML['label_page'],
    "id_page" => $this->VARS_HTML['iIndiceToPage']

    
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

