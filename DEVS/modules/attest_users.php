<?php

// list of php files (classes...) needed for this class :
require_once "attest_users_service.php";

/**
 * Class "Attest_users" / file "attest_users.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "attest_users_service.php";
 *
 * @package Afpacar Project
 * @subpackage Attest_users
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Attest_users {
	
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
	 * it is executed thanks to code "new Attest_users()"
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
		$this->oService= new Attest_users_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;
	}

}

?>
