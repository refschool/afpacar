<?php

// list of php files (classes...) needed for this class :
require_once "contact_users_service.php";

/**
 * Class "Contact_users" / file "contact_users.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "contact_users_service.php";
 *
 * @package Afpacar Project
 * @subpackage Contact_users
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Contact_users__mailing {
	
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
	 * it is executed thanks to code "new Contact_users()"
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
		$this->oService= new Contact_users_service();
        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;
		$this->aResult = $this->oService->aResult;

		$this->checkForms();
		if ($this->aResult["nb_errors"] == 0)	{
			$this->send_mail_contact();
		}
		
	}

	private function checkForms()	 {
		$this->aResult["nb_errors"]= 0;
		if ((!isset($this->VARS_HTML["champ_nom"])) || ($this->VARS_HTML["champ_nom"] == ""))	
		{
			$this->aResult["nb_errors"]= 1;
		}  
		else if ((!isset($this->VARS_HTML["champ_prenom"])) || ($this->VARS_HTML["champ_prenom"] == ""))	
		{
			$this->aResult["nb_errors"]= 2;
		}
		else if ((!(isset($this->VARS_HTML["champ_mail"]))) || ($this->VARS_HTML["champ_mail"] == "") ||(!(filter_var($this->VARS_HTML["champ_mail"], FILTER_VALIDATE_EMAIL))))
		{
			$this->aResult["nb_errors"]= 3;
		}
		else if ((!isset($this->VARS_HTML["champ_message"])) || ($this->VARS_HTML["champ_message"] == ""))
		{
			$this->aResult["nb_errors"]= 4;
		}
	}

	private function send_mail_contact()	 
	{
		if (isset($this->VARS_HTML['champ_message'])) 
        {
            $retour = mail('tijipe2110@nnacell.com', 'Envoi depuis la page Contact', $this->VARS_HTML['champ_message'], 'From: ' . $this->VARS_HTML['champ_mail']);
            if(!$retour)	
			{
				$this->aResult["nb_errors"]= 5;
			}
        }
	}

}

?>
