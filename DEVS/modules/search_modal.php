<?php
require_once "search_service.php";
/**
 * /**
 * Class "Liste_search" / file "liste_search.php"
 *
 * Page to listing add 
 *
 * This class requires the use of the class:
 *  • require_once "search_service.php";
 *
 * @package Afpacar Project
 * @subpackage Profile
 * @author @AfpaLabTeam - Thomas
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Search_modal {



    /**
     * public $resultat is used to store all datas needed for HTML templates
     * @var array
     */
    public $aResult;

    // /**
    //  * @property object $oService the class service object.
    //  * 
    //  */
    // public $oService;


    /**
     *  * Constructor :
	 * 
	 * it is executed thanks to code "new Liste_search()"
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
    $oService= new Search_service();
    $oService->search_modal();

    // i pass my parameters to have access to them in my html pages
    $this->aResult = $oService->aOfSearchModal ;
    // d'apres ce que j'ai compris il sert pour le bJon dans le route et rien dautre car le tabelau est deja present dans aResult 
    $this->VARS_HTML=$oService->VARS_HTML;

    // kill object
	unset($this->oService);
}
}


?>