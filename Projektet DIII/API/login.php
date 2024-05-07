<?php

$requestMethod = $_SERVER["REQUEST_METHOD"];
$existingUsers = file_get_contents("../users.json");
$data = file_get_contents("php://input");
$json = json_decode($json, true);
echo $json;

if ($requestData == "POST") {

    $logindata = ["username", "password"];

}


// require_once("helpers.php");

// if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
//     header("Access-Control-Allow-Headers: *");
//     header("Access-Control-Allow-Methods: *");
//     header("Access-Control-Allow-Origin: *");
//     exit();
// } else {
//     header("Access-Control-Allow-Origin: *");
// }

// $requestMethod = $_SERVER["REQUEST_METHOD"];
// $requestData = getRequestData();

// if ($requestMethod == "POST") {  // Login (username + password)

//     if (empty($requestData)) {
//         abort(400, "Bad Request (empty request)");
//     }

//     $loginKeys = ["username", "password"];

//     if (requestContainsAllKeys($requestData, $loginKeys) == false) {
//         abort(400, "Bad Request (missing keys)");
//     }

//     $username = $requestData["username"];
//     $password = $requestData["password"];
//     $user = findItemByKey("USERS", "username", $username);

//     if ($user == false) {
//         abort(404, "User Not Found");
//     }

//     if ($user["password"] != $password) {
//         abort(400, "Bad Request (invalid password)");
//     }

// } else {
//     abort(405, "Method Not Allowed");
// }

?>