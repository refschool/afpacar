<?php
require_once  "initialize.php";
/**
 * Class "Index_service" / file "index_service.php"
 *
 * Description of the class to be filled in.
 *
 * This class requires the use of the class:
 *  • require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage index_service
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Index_service extends Initialize	{

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

