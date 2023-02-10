<?php
require_once  "initialize.php";

/**
 * Class "Adm_gestionadmin_service" / file "adm_gestionadmin_service.php"
 *
 * Your class description here ...
 *
 * This class requires the use of the class:
 *  - require_once "initialize.php";
 *
 * @package Afpacar Project
 * @subpackage Adm_gestionadmin_service
 * @author @AfpaLabTeam - Mathieu santiago
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Adm_gestionadmin_service extends Initialize
{

  public $resultat;


  /**
   * Constructor :
   * 
   * it is executed thanks to code "new Adm_gestionadmin_service()"
   * every time it is executed it creates an instance of this class
   * and it executes the code present in this function
   */
  public function __construct()
  {
    // call parent constructor
    parent::__construct();
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

  
	/**
   * method for update status at user admin 
   * 
   * status 1 user is active 
   * status 0 user is disabled 
   * @return $resultat
	 **/
  public function update_eta(){
    //control if datas not empty before send into the datas base 
    if ($this->VARS_HTML['eta'] != "" && $this->VARS_HTML['user_id'] != "") {
      
      $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'update_eta.sql';
      $this->resultat= $this->oBdd->treatDatas($sSqlPath, array(
        "eta" => $this->VARS_HTML['eta'],
        "user_id" => $this->VARS_HTML['user_id']
        ));
    }
  }


  /**
   * Method is useful for authenticate user
   * 
   * if code 'code_beneficiaire' user exist in to the API AfpaConnect 
   * if user not exist in to the API code 100
   * @return $resultat : boolean false
   * if user exist in to the API code 101   
   * @return $resultat : boolean true
	 **/
  public function newAdminToken(){
    $response = $this->api->get('user', [
      'username' => $this->VARS_HTML['code_benef']
  ]);
    $result = json_decode($response, true);


    if ($result['code'] == 101) {
      $result['boolean'] = 1;
    }
    if ($result['code'] == 100) {
      $result['boolean'] = 0;
    }

    $this->resultat= $result;
 }


  /**
   * This method is uerful for recover role at the Api afpaconnect
   * ROLE_ADMIN
   * ROLE_SUPER_ADMIN
   * ROLE_USER
   */
  public function getAppRoles()
  {
    $this->resultat= $this->api->get('roles');
      
  }


 	/**
   * method  for recover listing user admin  
   * @return $resultat
	 **/
  public function getAdminUsers(){
    // recover datas of file usersAdmin.json 
    $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'liste_users_admin.sql';
    $this->resultat= $this->oBdd->getSelectDatas($sSqlPath) ;
    //return the datas at call ajax
 }


	/**
     * method for delete user admin
     * @return $resultat :array 
	 **/
  public function delete_user(){
    // control if datas not empty before send into the datas base 
    if ($this->VARS_HTML['eta'] != "" && $this->VARS_HTML['user_id'] != "") {
     
     $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'delete_user.sql';
     $this->resultat= $this->oBdd->treatDatas($sSqlPath, array(
       "eta" => $this->VARS_HTML['eta'],
       "id_user" =>$this->VARS_HTML['id_user']
       ));

   }
 }


  /**
   * This method is userful for update the role a user
   * Role Admin
   * Role Super Admin 
   * Role User
   * @return $resultat :array 
	 **/
  public function changeRole(){
    //control if datas not empty before send into the datas base 
    if ($this->VARS_HTML['eta'] != "" && $this->VARS_HTML['user_id'] != "") {

      $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_update_role.sql';
      $this->resultat= $this->oBdd->treatDatas($sSqlPath, array(
        "role" => $this->VARS_HTML['role'],
        "id_user" =>$this->VARS_HTML['id_user']
      ));

    }
   
 }


  /**
   * This method is userful for add the new user admin in to the bdd 
   * if methode newAdminToken return 1(true)
   * register user withe a datas send for the api 
   * in to the dataBase
   */
 public function new_admin(){
  // control if datas not empty before send into the datas base 
  if (

      $this->VARS_HTML['id_center'] != ""      && $this->VARS_HTML['name_functions'] != "" &&
      $this->VARS_HTML['name_role'] != ""      && $this->VARS_HTML['name_user'] != ""      &&
      $this->VARS_HTML['firstname_user'] != "" && $this->VARS_HTML['gender_user'] != ""    &&
      $this->VARS_HTML['email_user'] ==  ""    && $this->VARS_HTML['registration_number_user'] != ""  &&
      filter_var($this->VARS_HTML['email_user'], FILTER_VALIDATE_EMAIL)     

  ) {
      $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'adm_new_admin.sql';
      $this->resultat= $this->oBdd->treatDatas($sSqlPath, array(
      "id_center" => $this->VARS_HTML['id_center'],
      "name_functions" =>$this->VARS_HTML['name_functions'],
      "name_role" => $this->VARS_HTML['name_role'],
      "name_user" => $this->VARS_HTML['name_user'],
      "firstname_user" => $this->VARS_HTML['firstname_user'],
      "gender_user" => $this->VARS_HTML['gender_user'],
      "email_user" => $this->VARS_HTML['email_user'],
      "tel_user" => $this->VARS_HTML['tel_user'],
      "hash_user" => $this->VARS_HTML['hash_user'],
      "registration_number_user" => $this->VARS_HTML['registration_number_user'],
      "is_active_user" => $this->VARS_HTML['is_active_user']
    ));
  }
 }
}
  

?>

