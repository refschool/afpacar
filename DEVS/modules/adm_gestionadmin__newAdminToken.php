<?php

// list of php files (classes...) needed for this class :
require_once "adm_gestionadmin_service.php";

/**
 * Class "Adm_gestionadmin" / file "adm_gestionadmin.php"
 *
 * This is an admin functionality
 * 
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "adm_gestionadmin_service.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_gestionadmin
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_gestionadmin__newAdminToken {
	
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
	 * it is executed thanks to code "new Adm_gestionadmin__getusersadmin()"
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
	
	public function simulateAdminAfpaconnect()
    {
		$user = [
			
		];
		return $user;	
    }


	/**
	 * Your main function : Describe here what it is used for...
	 */
	private function main() {
        // I create my service object
		$this->oService= new Adm_gestionadmin_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;
		//execut methode getAdminUsers in to object service
		$this->oService->newAdminToken();
		$this->aResult = $this->oService->resultat;
		
		unset($this->oService);
	}

}
