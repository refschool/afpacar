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
Class Adm_faq_service extends Initialize
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

  public function getFaq(){
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_faq__getfaq.sql';
    $this->aResult = $this->oBdd->getSelectDatas($sSqlPath) ;
  }

  public function deleteFaq(){
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_faq__deleteFaq.sql";
		$this->aResult = $this->oBdd->treatDatas($spathSQL, array(
																	"iIndiceASupprimer" => $this->VARS_HTML["iIndiceASupprimer"]
																	));
  }

  public function editFaq()
  {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_faq__editFaq.sql";
		$this->aResult = $this->oBdd->treatDatas(
      $spathSQL,
      array(
        "iIndiceQuestion" => $this->VARS_HTML["iIndiceQuestion"], "question_summernote"=>$this->VARS_HTML["question_summernote"], "reponse_summernote"=>$this->VARS_HTML["reponse_summernote"], 
        "id_center"=>+$_SESSION["centerId"]
        
      ),
      1
    );
  }

  public function addFaq()
  {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_faq__addFaq.sql";
		$this->aResult = $this->oBdd->treatDatas(
      $spathSQL,
      array(
        "question_summernote"=>$this->VARS_HTML["question_summernote"], "reponse_summernote"=>$this->VARS_HTML["reponse_summernote"],
        "id_center"=>+$_SESSION["centerId"]
      ),
      1
    );
    $this->resultat["id_faq_created"]= $this->oBdd->getLastInsertId();
  }  

  public function unableFaq()
  {
    $spathSQL= $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "adm_faq__unableFaq.sql";
    $this->aResult = $this->oBdd->treatDatas(
      $spathSQL,
      array(
        "iIndiceToUnable"=>$this->VARS_HTML["iIndiceToUnable"]
      ),
      1
    );
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

