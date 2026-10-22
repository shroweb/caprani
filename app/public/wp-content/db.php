<?php
/**
 * SQLite Database Drop-in loader for Wasmer Edge.
 * In local environment (Local by Flywheel), WordPress continues to use MySQL natively.
 */
if ( getenv( 'WASMER_APP_URL' ) || ( defined( 'DB_ENGINE' ) && 'sqlite' === DB_ENGINE ) ) {
	if ( file_exists( __DIR__ . '/sqlite/db.php' ) ) {
		require_once __DIR__ . '/sqlite/db.php';
	}
}
