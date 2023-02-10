<?php
require_once "index_service.php";

/**
 * Class "Index" / file "index.php"
 *
 * Description of the class to be filled in.
 *
 * This class requires the use of the class:
 *  • require_once "index_service.php";
 *
 * @package Afpacar Project
 * @subpackage Index
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Index	{
	
    /**
     * public $resultat is used to store all datas needed for HTML Templates
     * @var array
     */
    public $resultat;

    /**
     * init variables resultat
     *
     * execute main function
     */
    public function __construct() {
        // init variables resultat
        $this->resultat = [];

        // execute main function
        $this->main();
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct() {
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Get interface to gestion of accueil
     */
    function main() {
		$objet_service = new Index_service();
		// Here I make my call $object_service->my_method_which_is_in_the_service
		
		// I pass my parameters to have access to them in my HTML pages
		$this->resultat = $objet_service->resultat;
		$this->VARS_HTML = $objet_service->VARS_HTML;
    }
	
}

?>

