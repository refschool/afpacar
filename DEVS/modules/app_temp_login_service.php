<?php
require_once  "initialize.php";

/**
 * Class "App_temp_login_service" / file "app_temp_login_service.php"
 *
 * ♦♦♦ TEMPORARY ♦♦♦
 * 
 * Service class of the "App_temp_login" class.
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage App_temp_login_service
 * @author @AfpaLabTeam - Mathieu & Damien
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class App_temp_login_service extends Initialize	{

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
    // call parent constructor
    parent::__construct();

    // init variables resultat
    $this->resultat = [];

    // execute main function
    
  }

  /**
   *
   * Destroy service
   *
   */
  public function __destruct() {
    // call parent destructor
    parent::__destruct();
  }

}
  

?>

