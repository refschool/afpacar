<?php

Class Configuration	{

	/**
	 * @property string $logsPath Path of the folder that will be used to save the logs
	 */
	public static $logsPath;

	/**
	 * Returns the project config from the ini file
	 * 
	 * @return array|false It will return an array, or false if an error occurred
	 */
	public static function getGlobalsINI() {
		$devIni = "files/config_afpacar_dev.ini";
		$prodIni = "files/config_afpacar_prod.ini";
		$DOCUMENT_ROOT= $_SERVER['DOCUMENT_ROOT'];
		$aOfPaths= explode("/", $DOCUMENT_ROOT);
		for ($i=count($aOfPaths)-1; $i>0; $i--)	{
			$DOCUMENT_ROOT= str_replace($aOfPaths[$i], "", $DOCUMENT_ROOT);
			$DOCUMENT_ROOT= str_replace("//", "/", $DOCUMENT_ROOT);
			if (is_file($DOCUMENT_ROOT . $devIni))	{
				return parse_ini_file($DOCUMENT_ROOT . $devIni, false);
			}  else if (is_file($DOCUMENT_ROOT . $prodIni))	{
				return parse_ini_file($DOCUMENT_ROOT . $prodIni, false);
			}
		}
	}

	/**
	 * Returns the path of the folder that will be used to save the logs
	 * 
	 * @param bool $mkdir If true : creates the directory if it dos not exist
	 * 
	 * @return string|null It will return the path, or null if an error occurred
	 */
	public static function getLogsPath($mkdir = false) {
		$globalsIni = Configuration::getGlobalsINI();
		if ( (gettype($globalsIni) !== 'array') || (!isset($globalsIni['PATH_HOME'])) ) {
			return;
		}
		if ( !isset($globalsIni['PATH_LOGS']) ) {
			$globalsIni['PATH_LOGS'] = 'files' . $globalsIni['BASE_HREF'] . 'logs/';
		}
		$logsPath = $globalsIni['PATH_HOME'] . '/' . $globalsIni['PATH_LOGS'];
		return dirPath($logsPath, $mkdir);
	}

}

?>