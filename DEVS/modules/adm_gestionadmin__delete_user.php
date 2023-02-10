<?php

// list of php files (classes...) needed for this class :
require_once "adm_gestionadmin_service.php";

/**
 * Class "Adm_gestionadmin__delete_user" / file "adm_gestionadmin__delete_user.php"
 *
 * This is an admin functionality
 * 
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "adm_gestionadmin__delete_user_service.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_gestionadmin__delete_user
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_gestionadmin__delete_user {
	
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
	 * it is executed thanks to code "new Adm_gestionadmin__delete_user()"
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
		//execut methode delete_user in to object service and pass the parametres
		$this->oService->delete_user();
		$this->aResult = $this->oService->resultat;
		unset($this->oService);
	}
}

?>
