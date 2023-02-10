<?php
require_once "initialize.php";
/**
 * Class  search_service | file search_service.php
 * 
 * In this class,we have methods for:
 * -listing all ad with method list_search()
 * with this interface, we'll be able to list all the add stored in database
 * 
 * List of classes needed for this class 
 * 
 * require_once "search_service.php"
 * 
 *  * @package Afpacar Project
 * @subpackage profile_service
 * @author @AfpaLabTeam - Thomas
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 * 
 */
class Search_service extends Initialize
{

  /**
   * public $resultat is used to store all datas needed for HTML templates
   * @var array
   */
  public $aResult;
  /**
   * public array aOfSearchListAd and aOfSearchListAdCity and aOfSearchCity and $aOfSearchModal and  $aOfSearchBook and aOfSearchControlBook
   * @var array 
   */
  public $aOfSearchListAdCity;
  public $aOfSearchListAd;
  public $aOfSearchCity;
  public $aOfSearchModal;
  public $aOfSearchBook;
  public $aOfSearchControlBook;
  public $aOfSearchHistoricListAd;
  public $aOfSearchIdUser;


  /**
   * Call the arent constructor
   *
   * init variables resultat
   */
  public function __construct()
  {
    // Call Parent Constructor
    parent::__construct();
    $this->aResult = [];
    $this->aOfSearchListAdCity = [];
    $this->aOfSearchListAd = [];
    $this->aOfSearchHistoricListAd = [];
    $this->aOfSearchCity = [];
    $this->aOfSearchModal = [];
    $this->aOfSearchBook = [];
    $this->aOfSearchControlBook = [];
    $this->aOfSearchIdUser = [];
    $this->aOfSearchHistoricListBook=[];
  }
  public function __destruct()
  {
    // Call Parent destructor
    parent::__destruct();
  }
  /* 
   * Method liste_search
   * list all ad in the database
   */
  public function search_list()
  {
    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__get_ad.sql";

    $aOfSearchListAd = $this->oBdd->getSelectDatas($spathSQL, array(
      "ville" => $this->VARS_HTML["ville"],
      "date_trajet" => $this->VARS_HTML["date_trajet"],
      "bAllerRetour" => $this->VARS_HTML["bAllerRetour"],
      "bDriver" => $this->VARS_HTML["bDriver"],
      "bSmoke" => $this->VARS_HTML["bSmoke"],
      "bLuggage" => $this->VARS_HTML["bLuggage"],
      "bHandicap" => $this->VARS_HTML["bHandicap"]


    ));
    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__get_ad__city.sql";

    $aOfSearchListAdCity = $this->oBdd->getSelectDatas($spathSQL, array(
      "ville" => $this->VARS_HTML["ville"],
      "date_trajet" => $this->VARS_HTML["date_trajet"],
      "bAllerRetour" => $this->VARS_HTML["bAllerRetour"],
      "bDriver" => $this->VARS_HTML["bDriver"],
      "bSmoke" => $this->VARS_HTML["bSmoke"],
      "bLuggage" => $this->VARS_HTML["bLuggage"],
      "bHandicap" => $this->VARS_HTML["bHandicap"]

    ));


    $this->aResult["search_list_final"] = [];
    $bAllerRetour = $this->VARS_HTML["bAllerRetour"];
    error_log("bAllerRetour = " . $bAllerRetour);

    if ($bAllerRetour == 0) {
      foreach ($aOfSearchListAd as $ligne) {
        if ($ligne["aller"] != "") {
          error_log("Boucle 1 ");
          $this->aResult["search_list_final"][] = $ligne;
        }
      }
    } else if ($bAllerRetour == 1) {

      foreach ($aOfSearchListAd as $ligne) {
        if ($ligne["retour"] != "") {
          error_log("Boucle 2 ");
          $this->aResult["search_list_final"][] = $ligne;
        }
      }
    } else {
      foreach ($aOfSearchListAd as $ligne) {

        if (($ligne["aller"] != "" && $ligne["retour"] != "")) {
          $this->aResult["search_list_final"][] = $ligne;
          error_log("Boucle 3");
        }
      }
    }

    if ($bAllerRetour == 0) {
      foreach ($aOfSearchListAdCity as $ligne) {
        if ($ligne["aller"] != "") {
          $this->aResult["search_list_final"][] = $ligne;
          error_log("Boucle 4 ");
        }
      }
    } else if ($bAllerRetour == 1) {
      foreach ($aOfSearchListAdCity as $ligne) {
        if ($ligne["retour"] != "") {
          error_log("Boucle 5 ");
          $this->aResult["search_list_final"][] = $ligne;
        }
      }
    } else {
      foreach ($aOfSearchListAdCity as $ligne) {
        if (($ligne["aller"] != "" && $ligne["retour"] != "")) {
          error_log("Boucle 6 ");
          $this->aResult["search_list_final"][] = $ligne;
        }
      }
    }
  }
  public function search_city()
  {
    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__get_city.sql";

    $this->aOfSearchCity = $this->oBdd->getSelectDatas($spathSQL, array());
  }
  public function search_modal()
  {
    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__get_modal.sql";

    $this->aOfSearchModal["add_info"] = $this->oBdd->getSelectDatas($spathSQL, array(
      "id_ad" => $this->VARS_HTML["id_ad"],
    ));

    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__historic_get_modal_user.sql";
    $this->aOfSearchModal["add_user"] = $this->oBdd->getSelectDatas($spathSQL, array(
      // "id_user" => $this->VARS_HTML["id_user"],
      "id_ad" => $this->VARS_HTML["id_ad"],
    ));
    

  }
  public function search_book()
  {

    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__get_control_book.sql";
    $this->aOfSearchControlBook = $this->oBdd->getSelectDatas($spathSQL, array(
      "id_ad" => $this->VARS_HTML["id_ad"],
      "id_user" => $this->VARS_HTML["id_user"]
    ));
    if ($this->aOfSearchControlBook[0]["control"] == 0) {
      $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__get_book.sql";
      $this->oBdd->treatDatas($spathSQL, array(
        "id_ad" => $this->VARS_HTML["id_ad"],
        "id_user" => $this->VARS_HTML["id_user"]
      ));
      $this->aOfSearchBook["control"] = 0;
    } else {
      $this->aOfSearchBook["control"] = 1;
    }
  }

  public function search_idUser()
  {
    $this->aOfSearchIdUser = +$_SESSION["userId"];
  }

  // ***********************************SEARCH HYSTORIC********************************************/**//
  // *************************************************************************************************//
  // *************************************************************************************************//

  public function search_historic_list()
  {
    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__historic_get_ad.sql";

    $this->aOfSearchHistoricListAd= $this->oBdd->getSelectDatas($spathSQL, array(
      "id_user" => $this->VARS_HTML["id_user"]

    ));

    $spathSQL = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . "search__historic_get_book.sql";

    $this->aOfSearchHistoricListBook = $this->oBdd->getSelectDatas($spathSQL, array(
      "id_user" => $this->VARS_HTML["id_user"]

    ));
    $this->aResult["result_final"]=[];
    foreach ($this->aOfSearchHistoricListAd as $ligne) {
      if ($ligne["retour"] != "") {
        error_log("Boucle 1 ");
        $this->aResult["result_final"][]= $ligne;
      }
    }
    foreach ($this->aOfSearchHistoricListBook as $ligne) {
      if ($ligne["retour"] != "") {
        error_log("Boucle 2 ");
        $this->aResult["result_final"][]= $ligne;

      }
    }
  }
 
}
