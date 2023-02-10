
<?php


// list of php files (classes...) needed for this class :
require_once "search_service.php";

/**
 * Class "Search" / file "search.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  • require_once "search_service.php";
 *
 * @package Afpacar Project
 * @subpackage Search
 * @author @AfpaLabTeam - You
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
class Search_historic{

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
	 * it is executed thanks to code "new Search()"
	 * every time it is executed it creates an instance of this class
	 * and it executes the code present in this function
	 */
	public function __construct()
	{
		// execute main function
		$this->main();
	}

	//----------------------------------------------------------------------------------//
	//                                 MAIN FUNCTION                                    //
	//----------------------------------------------------------------------------------//

	/**
	 * Your main function : Describe here what it is used for...
	 */
	private function main()
	{
		// I create my service object
		$this->oService = new Search_service();
		// I pass my parameters to have access to them in my HTML pages
		$this->VARS_HTML = $this->oService->VARS_HTML;

		
	}
}

?>
