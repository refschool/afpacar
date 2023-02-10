<?php

require_once "database.php";
require_once "security.php";

use Guillian\AfpaConnect\AfpaConnect;

/**
 * @author Mathieu ;)
 */
Class Initialize {
	/**
	 * @var object $oBdd
	 * @var array $GLOBAL_INI
	 * @var object $oSecu
	 * @var array $VARS_HTML
	 * 
	 */
	// Database instance object
	public $oBdd;
	// All globals from INI
	public $GLOBALS_INI;
	// Form Security instance object
	private $oSecu;
	// Array of data
	public $VARS_HTML;
	
	public AfpaConnect $api;

	public static $_apiInstance = null;
	/**
	 * 
	 * Fill GLOBAL_INI with an array of path variables
	 * Create instance of Security and Database connection 
	 * Set data in public VARS_HTML from Security Object VARS_HTML argument
	 * 
	 */
	public function __construct()	{
		// Instance of Config
		$this->GLOBALS_INI= Configuration::getGlobalsINI();
		$this->api = self::getApi();

		// Instance of BDD
		$this->oBdd = new Database($this->GLOBALS_INI["DB_HOST"],
								   $this->GLOBALS_INI["DB_NAME"],
								   $this->GLOBALS_INI["DB_LOGIN"],
								   $this->GLOBALS_INI["DB_PSW"]);

		// Instance of Security to have $this->VARS_HTML
		$this->oSecu= new Security();
		$this->VARS_HTML= $this->oSecu->VARS_HTML;
	}

			/**
	 * Get AfpaConnect Interface Helper instance once.
	 *
	 * @return AfpaConnect
	 */
	public static function getApi(): AfpaConnect
	{
		if (is_null(self::$_apiInstance)) {
			$conf = Configuration::getGlobalsINI();
			$publicKey = file_get_contents($conf['PATH_HOME'].$conf['API_PUBLIC_KEY']);
			self::$_apiInstance = new AfpaConnect($conf['API_HOSTNAME'], "afpanier", $publicKey);
		}

		return self::$_apiInstance;
	}



	/**
	 * Destroy security Object and Database initialization Object
	 */
	public function __destruct()	{
		// destroy Instance of Form
		unset($this->oSecu);
		// disconnect of BDD
		// destroy Instance of BDD
		unset($this->oBdd);
	}


//End of class
}

?>
