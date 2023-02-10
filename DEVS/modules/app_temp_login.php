<?php

// list of php files (classes...) needed for this class
require_once "app_temp_login_service.php";


/**
 * Class "App_temp_login" / file "app_temp_login.php"
 *
 * ♦♦♦ TEMPORARY ♦♦♦
 * 
 * Simulates an admin user connexion (with user mode or not)
 * or a non-admin user connexion
 * To display the correct homepage / header
 * 
 * This class requires the use of the class:
 *  • require_once "app_temp_login_service.php";
 * 
 * @package Afpacar Project
 * @subpackage App_temp_login
 * @author @AfpaLabTeam - Mathieu & Damien
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class App_temp_login {
    /**
     * @property array $aResult Array that will contain the result to send to JS.
     */
    public $aResult = [];

    /**
     * @property object $oService The class service object.
     */
    private $oService;

    /**
     * Object constructor
     */
    public function __construct() {

        // Creates a new service object
		$this->oService= new App_temp_login_service();

        // I pass my parameters to have access to them in my HTML pages
        $this->VARS_HTML = $this->oService->VARS_HTML;
        $this->aResult['error'] = true;
        
        if (!isset($_POST['action']) ) {
            return;
        }
        switch ($_POST['action']) {
            case 'simulateNonAdminConnexion':
                $this->aResult['error'] = !static::simulateNonAdminConnexion();
                break;
            case 'simulateAdminConnexion':
                $this->aResult['error'] = !static::simulateAdminConnexion(false);
                break;
            case 'simulateAdminConnexionWithUserMode':
                $this->aResult['error'] = !static::simulateAdminConnexion(true);
                break;
            case 'disableUserMode':
                App::disableUserMode();
                $this->aResult['error'] = false;
                break;
            case 'logout':
                $this->aResult['error'] = !App::disconnectUser();
                break;
        }
    }
 

    /**
     * Simulate an admin connexion (userRole = 4) : il will connect Jijou 
     * 
     * @param bool $setUserMode If true, the admin will be able to navigate as a user (false by default)
     * 
     * @return bool True on success, or false on failure
     */
    private static function simulateAdminConnexion($setUserMode = false) : bool
    {
        App::disconnectUser();
        $_SESSION['userId'] = '1';
        $_SESSION['centerId'] = '1';
        $_SESSION['userName'] = 'Pagan';
        $_SESSION['userFirstName'] = 'Jean-Jacques';
        $_SESSION['userEmail'] = 'pagan.jijou@gmail.com';
        $_SESSION['userIdentifier'] = '2154987654';
        $_SESSION['userPhoneNumber'] = '0636231456';
        $_SESSION['userRole'] = '4';
        $_SESSION['userLastConnexionDatetime'] = '2021-04-14 16:12:23';
        $_SESSION['userGender'] = '1';
        $_SESSION['userStatus'] = '1';
        if ($setUserMode) {
            App::enableUserMode();
        } else {
            App::disableUserMode();
        }
        log::f(
            '$_SESSION',
            '$_SESSION après simulateAdminConnexion() :',
            $_SESSION
        );
        if ( strtolower($_SESSION['userName']) !== 'pagan' ) {
            return false;
        }
        return ( $_SESSION['userMode'] == $setUserMode );
    }


    /**
     * Simulate a non-admin connexion (userRole = 0) : il will connect Brad Pitt
     * 
     * @return bool True on success, or false on failure
     */
    private static function simulateNonAdminConnexion() : bool
    {
        App::disconnectUser();
        $_SESSION['userId'] = '3';
        $_SESSION['centerId'] = '1';
        $_SESSION['userName'] = 'Pitt';
        $_SESSION['userFirstName'] = 'Brad';
        $_SESSION['userEmail'] = 'brad.pitt@free.fr';
        $_SESSION['userIdentifier'] = '95135789';
        $_SESSION['userPhoneNumber'] = '0497463162';
        $_SESSION['userRole'] = '0';
        $_SESSION['userLastConnexionDatetime'] = '2021-04-15 11:04:52';
        $_SESSION['userGender'] = '1';
        $_SESSION['userStatus'] = '1';
        log::f(
            '$_SESSION',
            '$_SESSION après simulateNonAdminConnexion() :',
            $_SESSION
        );
        return ( strtolower($_SESSION['userName']) === 'pitt' );
    }


}