<?php

// list of php files (classes...) needed for this class :
require_once "info_service.php";

/**
 * Class "Mentions_legales" / file "functionality.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "mentions_legales.php";
 *
 * @package Afpacar Project
 * @subpackage Mentions_legales
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Mentions_legales_list {
	
	/**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array 
     */
	public $aResult = [];
	
    /**
     * @property object $oService The class service object.
     */
	private $oService;

	/**
	 * Constructor :
	 * 
	 * it is executed thanks to code "new Mentions_legales()"
	 * every time it is executed it creates an instance of this class
	 * and it executes the code present in this function
	 */
	public function __construct(){
        // execute main function
        $this->aResult=[];
        $this->main();


    }

    public function main(){

    // Create my service object
    $oService= new info_service();
      // d'apres ce que j'ai compris il sert pour le bJon dans le route et rien dautre car le tabelau est deja present dans aResult 
      $this->VARS_HTML=$oService->VARS_HTML;
    $oService->mentions_legales_list();

    // i pass my parameters to have access to them in my html pages
    $this->aResult = $oService->aOfMentionsLegales ;
  

    // kill object
	unset($this->oService);
}
}

?>
