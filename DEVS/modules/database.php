<?php

/**
 * Class "Database" / file "database.php"
 *
 * In this class, we have all mysql methods :
 *
 * Connection to the database in the constructor
 *
 * Disconnection to the database in the destructor
 *
 * Getting the last insert id
 *
 * Execute select method
 *
 * Execute insert / update / delete method
 *
 * @package Afpacar Project
 * @subpackage Database
 * @author @AfpaLabTeam - JiJou
 * @copyright  1920-2080 Afpa Lab Team - DWWM
 * @version v1.0
 */
Class Database {
	
	/**
	 * @var object $_hDb This private var is used to store Database instance object
	 */
	private $_hDb;
	
	/**
	 * Connect to the database
	 * 
	 * @param string $host The host
	 * @param string $name The name
	 * @param string $login The login
	 * @param string $psw The password
	 */
	function __construct(string $host, string $name, string $login, string $psw)	{
		// Connection to DB : SERVEUR / LOGIN / PASSWORD / NOM_BDD
		try {
			$this->_hDb= new PDO('mysql:host='.$host.';dbname='.$name.';charset=utf8', $login, $psw);
		}
		catch (PDOException $e) {
			error_log("PDOException Connection to DB = " . $e->getMessage());
		}
	}

	/**
	 * Disconnect from the database
	 *
	 */
	function __destruct()	{
		$this->_hDb= null;
	}
	
	/**
	 * needed for phpunit
	 *
	 */
	function prepare($sql) {
		return $this->_hDb->prepare($sql);
	}
	/**
	 * Get the last id inserted
	 *
	 */
	public function getLastInsertId()	{
		return $this->_hDb->lastInsertId();
	}

	/**
	 * Execute select method
	 * 
	 * @param string $spathSQL The '.sql' file path
	 * @param array $data All the strings you want to replace and their corresponding value
	 * @param int|null $bForJS Is it for javaScript ? If true, If true, some special characters will be replaced
	 * 
	 * @return array
	 */
	function getSelectDatas(string $spathSQL, array $data=array(), $bForJS=null) {
		// content of SQL file
		$sql= file_get_contents($spathSQL);

		// replace variables @variable from sql by values of the same variables'name
		foreach ($data as $key => $value) {
			// security for SQL injection
			$value= str_replace("'", "__SIMPLEQUOT__", $value);
			$value= str_replace('"', '__DOUBLEQUOT__', $value);
			$value= str_replace(";", "__POINTVIRGULE__", $value);
			$value= str_replace('__APOSTROPHE__', '"', $value);
			$sql = str_replace('@'.$key, $value, $sql);
			// error_log("key = " . $key . " | " . "value= " . $value. " | " . "sql = " . $sql);
		}

		error_log("getSelectDatas = " . str_replace("\n", " ", str_replace("\r", " ", str_replace("\t", " ", $sql) ) ) );

		$resultat= [];
		$resultat["error"]= "";
		try {
			// Execute la requete
			$results_db= $this->_hDb->prepare($sql);
			$results_db->execute();
		}
		catch (PDOException $e) {
			$resultat["error"]= $e->getMessage();
			error_log("PDOException getSelectDatas = " . $resultat["error"]);
		}

		if ($resultat["error"] == "")	{
			$resultat= [];
			while ($ligne = $results_db->fetch()) {
				$new_ligne= [];
				foreach ($ligne as $key => $value) {
					if (!(is_numeric($key)))	{
						// error_log("getSelectDatas DETAILS = " . $key . " => " . $value);
						if ((isset($bForJS)) && (($bForJS == 1) || ($bForJS == 2)))	{
							$value= str_replace("__SIMPLEQUOT__", "'", $value);
							$value= str_replace('__DOUBLEQUOT__', '\"', $value);
							$value= str_replace("__POINTVIRGULE__", ";", $value);
							/*if ($bForJS == 2)	{
								$value= utf8_encode($value);
							}*/
						}  else  {
							$value= str_replace("__SIMPLEQUOT__", "'", $value);
							$value= str_replace('__DOUBLEQUOT__', '"', $value);
							$value= str_replace("__POINTVIRGULE__", ";", $value);
						}
						$new_ligne[$key]= $value;
					}
				}
				$resultat[]= $new_ligne;
			}
		}

		return $resultat;
	}

	/**
	 * Execute insert / update / delete method
	 *
	 * @param string $spathSQL The '.sql' file path
	 * @param array $data All the strings you want to replace and their corresponding value
	 * 
	 * @return array
	 */
	function treatDatas(string $spathSQL, array $data=array())	{
		// content of SQL file
		$sql= file_get_contents($spathSQL);

		// replace variables @variable from sql by values of the same variables'name
		foreach ($data as $key => $value) {
			// security for SQL injection
			$value= str_replace("'", "__SIMPLEQUOT__", $value);
			$value= str_replace('"', '__DOUBLEQUOT__', $value);
			$value= str_replace(";", "__POINTVIRGULE__", $value);
			$value= str_replace('__APOSTROPHE__', '"', $value);
			$sql= str_replace('@'.$key, $value, $sql);
		}
		
		error_log("treatDatas = " . str_replace("\n", " ", str_replace("\r", " ", str_replace("\t", " ", $sql) ) ) );

		// Execute la requete
		$resultat= [];
		$resultat["error"]= "";
		try {
			$this->_hDb->query($sql);
		}
		catch (PDOException $e) {
			$resultat["error"]= $e->getMessage();
			error_log("PDOException treatDatas = " . $resultat["error"]);
		}

		return $resultat;
	}



}
	
?>
