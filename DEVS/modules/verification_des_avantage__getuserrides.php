<?php

// list of php files (classes...) needed for this class :
require_once "verification_des_avantage_service.php";

/**
 * Class "Verification_des_avantage" / file "verification_des_avantage.php"
 *
 * This is an admin functionality
 * 
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "verification_des_avantage_service.php";
 *
 * @package Afpacar Project
 * @subpackage Verification_des_avantage
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Verification_des_avantage__getuserrides {
	
	/**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array 
     */
	public $aResult = [];
	
    /**
     * @property object $oService The class service object.
     */
	private $oService;
	private $aUserRides;
	private $user_center_passenger;



	/**
	 * Constructor :
	 * 
	 * it is executed thanks to code "new Verification_des_avantage()"
	 * every time it is executed it creates an instance of this class
	 * and it executes the code present in this function
	 */
	public function __construct()	{
		// execute main function
		$this->main();

		
		// if (!isset($_POST['action']) ) {
        //     return;
        // }
        // switch ($_POST['action']) {
		// 	case 'getUserRides':
		// 		$aUserRides = $this->oService->getUserRides();
		// 		$user_center_passenger = $this->oService->getUserCenter($aUserRides[0]['id_user__passenger']);
		// 		$this-> Linsting_travel($aUserRides, $user_center_passenger);
        //         break;
        // }
	}

	//----------------------------------------------------------------------------------//
	//                                 MAIN FUNCTION                                    //
	//----------------------------------------------------------------------------------//
	
	
	/**
	 * Your main function : Describe here what it is used for...
	 */
	private function main() {
		$fake_session = 5;
        // I create my service object
		$this->oService= new Verification_des_avantage_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;

		$aUserRides = $this->oService->getUserRides($fake_session);

		$user_center_passenger = $this->oService->getUserCenter($aUserRides[0]['id_user__passenger']);

		$this->aResult = $this-> Linsting_travel($aUserRides, $user_center_passenger);
	}

	Private function Linsting_travel($aUserRides, $user_center_passenger){
		
		$fake_session = 5;
		
		for ($i=0; $i < count($aUserRides); $i++) { 
			
			if ($aUserRides[$i]['citydep'] == "" || $aUserRides[$i]['citydep'] == null) {
				$aUserRides[$i]['citydep'] = $user_center_passenger[0]['name_center'];
			}
			if ($aUserRides[$i]['cityar'] == "" || $aUserRides[$i]['cityar'] == null) {
				$aUserRides[$i]['cityar'] = $user_center_passenger[0]['name_center'];
			}
			if ($aUserRides[$i]['id_user__writer'] == $fake_session) {
				$aUserRides[$i]["boolean"] = 1;
			}else{
				$aUserRides[$i]["boolean"] = 0;
			}

		}
		
		return $aUserRides;
		
	}

}
?>
