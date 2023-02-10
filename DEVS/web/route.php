<?php

//SESSION START
session_start();
require 'configuration.php';
$GLOBALS_INI = Configuration::getGlobalsINI();
$classesPath = $GLOBALS_INI['PATH_HOME'].$GLOBALS_INI['PATH_CLASS'];

if (!file_exists($classesPath.'vendor/autoload.php')) {
    echo "Vous devez installer les dépendances avec composer.<br/>";
    echo "A la racine du projet, exécuter la commande: <code>composer install</code>";
    die();
}

require $classesPath .'vendor/autoload.php';

require ($classesPath . 'utils.php');
require ($classesPath . 'log.php');
Configuration::$logsPath = Configuration::getLogsPath(true);
require ($classesPath . 'app.php');


// Dynamic Class 
if ((isset($_GET["page"])) && ($_GET["page"] != ""))	{
	$myPHP= $_GET["page"];
}  else  {
	if ((isset($_POST["page"])) && ($_POST["page"] != ""))	{
		$myPHP= $_POST["page"];
	}  else  {
		$myPHP= 'index';
	}
}

// todo : enable when all ajax will be defined
// // if not (on local & page visible only by a developper)
// if ( !(App::isLocalhost() && App::isDevelopperPage()) ) {
// 	if ( App::isAdminPage() ) {
// 		if ( App::isAdminConnected() ) {
// 			App::disableUserMode();
// 		} else {
// 			// ◘ if ADMIN PAGE desired BUT the connected user is NOT AN ADMIN ◘
// 			// redirects to the home page
// 			if ( !App::isFreeAccessPage() ) {
// 				$myPHP = 'index';
// 			}
// 		}
// 	} elseif ( App::isUserPage() ) {
// 		if ( App::isAdminConnected() ) {
// 			App::enableUserMode();
// 		} elseif ( !App::isUserConnected() ) {
// 			// ◘ if USER PAGE desired BUT the user is NOT CONNECTED ◘
// 			// redirects to the home page
// 			if ( !App::isFreeAccessPage() ) {
// 				$myPHP = 'index';
// 			}
// 		}
// 	} elseif ( !App::isFreeAccessPage() ) {
// 		// ◘ if the page is NOT AUTHORIZED for an UNCONNECTED user ◘
// 		// redirects to the home page
// 		$myPHP = 'index';
// 	}
// }

// Test if the class exists
if (!(file_exists($GLOBALS_INI["PATH_HOME"] . $GLOBALS_INI["PATH_CLASS"] . $myPHP . ".php"))) {
	$myPHP= 'index';
}

$myClass= ucfirst($myPHP);

require $GLOBALS_INI["PATH_HOME"] . $GLOBALS_INI["PATH_CLASS"] . $myPHP . ".php"; 

$oMain= new $myClass();

if ((isset($oMain->VARS_HTML["bJSON"])) && ($oMain->VARS_HTML["bJSON"] == 1))	{
	//if AJAX WITH JSON
	$page_to_load= $myPHP . ".html";
} else {
	$page_to_load= "route.html";
}

// load the 'html' page
require $GLOBALS_INI["PATH_HOME"] . $GLOBALS_INI["PATH_FILES"] . $page_to_load;


unset($oMain);
?>
