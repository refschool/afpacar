<?php
require_once  "initialize.php";

/**
 * Class "Profile_service" / file "profile_service.php"
 *
 * Page to edit user profile 
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage profile_service
 * @author @AfpaLabTeam - Thomas
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Profile_service extends Initialize
{

  /**
   * @var array $aResult The result of the service layer
   */
  public $aResult = [];

  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Profile_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
  }

  /**
   * Returns all addresses for the connected user 
   */
  public function profileGetAddresses()
  {
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'Profile__getAddresses.sql';
    $this->aResult = $this-> oBdd -> getSelectDatas(
      $sSqlPath,
      array(
        // variable de session pour que l'utilisateur connecté voit seulement ses adresses (faire glisser le fichier $_session dans le navigateur pour voir les variable de session )
        "userId"=>$_SESSION["userId"]
          
    
      )
    );
  }

    
    public function deleteAddresses()
    { 
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'User_Add.sql';
    $this->aResult = $this-> oBdd -> treatDatas($sSqlPath, array(
    "sessionId"=>$_SESSION["userId"]
    // variable de session pour que l'utilisateur connecté voit seulement ses adresse (faire glisser le fichier $_session dans le navigateur pour voir les variable de session )
      ));
     }

     public function editAddress()
     { 
     $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'profile__editAddress.sql';
     $this->aResult = $this-> oBdd -> treatDatas($sSqlPath, array(
     "sessionId"=>$_SESSION["userId"]
     // variable de session pour que l'utilisateur connecté voit seulement ses adresse (faire glisser le fichier $_session dans le navigateur pour voir les variable de session )
       ));
      }

      public function mainAddresses() // setMainAddress
      { 
      $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'User_Add.sql';
      $this->aResult = $this-> oBdd -> treatDatas($sSqlPath, array(
        "sessionId"=>$_SESSION["userId"]
      // variable de session pour que l'utilisateur connecté voit seulement ses adresse (faire glisser le fichier $_session dans le navigateur pour voir les variable de session )
        ));
       }


        /**
         * Destructor :
         * 
         * it destroys the instance of this class
         * and it executes the code present in this function
         */
        public function __destruct()
        {
          // call parent destructor
          parent::__destruct();
        }

}
  

?>

