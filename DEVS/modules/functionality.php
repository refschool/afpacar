<?php

// list of php files (classes...) needed for this class :
require_once "functionality_service.php";

/**
 * Class "Functionality" / file "functionality.php"
 *
 * This is the business layer of a NON-ADMIN functionality
 * 
 * ◘◘ Your class description here... ◘◘
 *
 * This class requires the use of the class:
 *  • require_once "functionality_service.php";
 *
 * @package Afpacar Project
 * @subpackage Functionality
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Functionality {
	
	/**
     * @var array $aResult The result of the business layer : used to store all datas needed for HTML Templates (you can copy into it the result of the service layer)
     */
	public $aResult = [];
	
    /**
     * @property object $oService The class service object.
     */
	private $oService;

	/**
	 * Constructor :
	 * 
	 * it is executed thanks to code "new Functionality()"
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
	 * Your main method : ◘◘ Describe here what it is used for... ◘◘ 
	 */
	private function main() {
        // I create my service object
		$this->oService = new Functionality_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;

		// ◘◘ PUT YOUR CODE HERE..... ◘◘

		// I copy the service layer result into the business layer result
		$this->aResult = $this->oService->aResult;
	}

	//----------------------------------------------------------------------------------//
	//                                 OTHER FUNCTIONS                                  //
	//----------------------------------------------------------------------------------//

	// ◘◘ You can add other methods here (data entry control...) ◘◘

}

?>
