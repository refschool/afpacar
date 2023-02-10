<?php
/**
* List of PHP needed for the tests
*/
require_once "configuration.php";
require_once "database.php";
require_once "security.php";
require_once "initialize.php";
/**
* Calling PHPUnit's Framework
*/
use PHPUnit\Framework\TestCase;
/**
* Class Test_getSelectDatas_avis | file Test_treatsSelectDatas_moderation.php
*
* In this class, we will test the method getSelectDatas on the table "avis"
* We will use standard MySQL command and count how many results we have
* And we will use the method getSelectDatas (present in database.php)
* => We will compare the 2 results
*
* We will need the assertion called "assertCount" for that.
*
* List of classes needed for this class
* configuration.php
* initialize.php
* database.php
* security.php
*
* @package AfpaCar Project
* @subpackage AfpaCar
* @author @Afpa Lab Team
* @copyright 1920-2080 The Afpa Lab Team Group Corporation World Company
* @version v1.0
*/
class Test_treatSelectDatas_moderation extends TestCase
{
/**
*
* Function should_contains_all_avis (name does not matter)
* BUT YOU HAVE TO WRITE THE COMMENTS <"at"test> JUST ABOVE YOUR FUNCTION
*
* 1.] Create instance of Initialize (Initialize does configuration, database connexion and security)
* BEWARE of using $oInit INSTEAD OF $this
* 2.] Execute SQL with NATIVE CODE and count the numbers of results
* 3.] Execute same SQL stored in SQL file and call getSelectDatas Method
* 4.] Compare the 2 results with the assertion "assertCount" (Param 1 : number of results, Param 2 :array of results)
*
*/
/** @test */
public function should_contains_all_moderation()
{
// ----------- PART 1 -----------
// Instance of Initialize
$oInit= new Initialize();
// ----------- PART 2 -----------
// Content SQL of the file select_avis.sql
$sql= "SELECT status_report_ad, subject_report_ad FROM ad where id_ad=3";
// Initialize the number of results
$iNbModeration= 0;
// Execute the query in NATIVE SQL CODE
$results_db= $oInit->oBdd->prepare($sql);
$results_db->execute();

$iResultat=[];
// Fetch on results and count them
while ($ligne = $results_db->fetch())
{
    
    $new_ligne= [];
    $new_ligne["status_report_ad"]= $ligne["status_report_ad"];
    $new_ligne["subject_report_ad"]= $ligne["subject_report_ad"];
    $iResultat = $new_ligne;
}
error_log( print_r($iResultat) );
// ----------- PART 4 -----------
// Execute same SQL stored in SQL file and call getSelectDatas Method
$spathSQL = $oInit->GLOBALS_INI["PATH_HOME"] . $oInit->GLOBALS_INI["PATH_MODEL"] . "adm_rides_moderator.sql";
$oInit->aResult = $oInit->oBdd->treatDatas($spathSQL, array(
  "status_report_ad" => "2",
  "subject_report_ad" =>"bla bla blibli"
  ));
  // Content SQL of the file select_avis.sql
$sql= "SELECT status_report_ad, subject_report_ad FROM ad where id_ad=3";
// Initialize the number of results
$iNbModeration= 0;
// Execute the query in NATIVE SQL CODE
$results_db= $oInit->oBdd->prepare($sql);
$results_db->execute();

$iResultat2=[];
// Fetch on results and count them
while ($ligne = $results_db->fetch())
{
    
    $new_ligne= [];
    $new_ligne["status_report_ad"]= $ligne["status_report_ad"];
    $new_ligne["subject_report_ad"]= $ligne["subject_report_ad"];
    $iResultat2 = $new_ligne;
}
error_log( print_r($iResultat2) );
// ----------- PART 5 -----------
// Compare the 2 results with the assertion "assertCount" (Param 1 : number of results, Param 2 : array of results)

$this->assertEquals($iResultat, $iResultat2);
}
}
?>
