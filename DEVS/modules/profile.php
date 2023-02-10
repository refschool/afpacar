<?php

// list of php files (classes...) needed for this class :
require_once "profile_service.php";

/**
 * Class "Profile" / file "profile.php"
 *
 * Page to edit user profile 
 *
 * This class requires the use of the class:
 *  • require_once "profile_service.php";
 *
 * @package Afpacar Project
 * @subpackage Profile
 * @author @AfpaLabTeam - Thomas
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Profile {
	
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
	 * it is executed thanks to code "new Profile()"
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
		$this->oService= new Profile_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;
	}

}

?>
