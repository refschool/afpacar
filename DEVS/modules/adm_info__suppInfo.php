<?php

// list of php files (classes...) needed for this class :
require_once "adm_info_service.php";

/**
 * Class "Adm_info" / file "adm_info.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "adm_info_service.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_info
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_info__suppInfo {
	
	
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
	 * it is executed thanks to code "new Adm_info()"
	 * every time it is executed it creates an instance of this class
	 * and it executes the code present in this function
	 */
	public function __construct()	{
		// execute main function
		$this->main();
	}

	//----------------------------------------------------------------------------------//
	//                                 MAIN FUNCTION                                    //
	//----------------------------------------------------------------------------------//
	
	/**
	 * Your main function : Describe here what it is used for...
	 */
	private function main() {
        // I create my service object
		$this->oService= new Adm_info_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;
		// I do what I want
		error_log($this->VARS_HTML['sPageName']);
		$this->oService->suppInfo($this->VARS_HTML['sPageName']); 
		// I copy the service layer result into the business layer result
		$this->aResult = $this->oService->aResult; 
	}

}

?>