<?php
require("DemoCreds.php");
echo $_POST["method"]();
function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}
function getDatabases() {
    // retrieve and sanitize posted values.
    if (isset($_POST['server'])) {
        $server = json_decode(sanitize($_POST['server']));
    }
    if (isset($_POST['username'])) {
        $username = json_decode(sanitize($_POST['username']));
    }
    if (isset($_POST['password'])) {
        $password = json_decode(sanitize($_POST['password']));
    }
    $databaseNames = array();
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword());
    $query = "SHOW DATABASES";
    $result = $dbConn->query($query);
    if ($result) {
        while ($row = $result->fetch_array()) {
            array_push($databaseNames, $row[0]);
        }
    }
    $return = new stdClass;
    $return->credentials = demoServer() . "  " . demoUsername() . "   " . demoPassword();
    $return->succsss = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    return $json;
}
function insertPlayer() {
    // retrieve and sanitize posted values.
    if (isset($_POST['Name'])) {
        $Name = json_decode(sanitize($_POST['Name']));
    }
    if (isset($_POST['Position'])) {
        $Position = json_decode(sanitize($_POST['Position']));
    }
    if (isset($_POST['Years'])) {
        $Years = json_decode(sanitize($_POST['Years']));
    }
    if (isset($_POST['Number'])) {
        $Number = json_decode(sanitize($_POST['Number']));
    }
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO Bengals_Offense (  Name, Position , Year, Number ) " .
        "VALUES ( " .
        "'". $Name . "', " .
        "'" . $Position . "', " .
        "'" . $Years . "', " .
        "'" . $Number . "'); ";
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = $query;
    if ($result) {
        //$return->connection = $dbConn;
        // $return->credentials = (string) (demoUsername() . demoPassword() . demoDB() . " on " . demoServer());
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}

/**
 * function getPlayers()
 *
 * preconditions: a file of the form given in DemoCreds.php that contains
 *                the credentials that will be used to access the database.
 *                This is not secure -- just for demo purposes.
 *
 * arguments: none
 *
 * action: retrieves all of the rows from table RectGardens and returns
 *         them in toto in the gardens property of the returned object.
 *
 * return An object that has the following fields:
 *     connect_error: error returned from mysqli_connect but only if an error
 *                    occured.  null otherwise
 *     success: a boolean indicating if the call was successful (true) or not
 *     gardens: an array of rows as arrays of columns
 *     querystring: the query string that was executed
 *     credentials: is this a bad idea or what?
 *
 * postconditions
 */
function getPlayers() {
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    $query = "SELECT * FROM Bengals_Offense";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return = "";
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $gardens = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 5; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($gardens, $allColumns);
        }
    }
    $return = new StdClass();
    $return->success = true;
    $return->gardens = $gardens;
    $return->querystring = $query;
    $return->credentials =
        demoUsername() .
        demoPassword() .
        demoDB() .
        " on " .
        demoServer();
    return json_encode($return);
}