
<?php

require_once("helpers.php");

// Enable CORS for all origins

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestData = getRequestData();

switch ($requestMethod) {
    case "POST":
        // Register a new user
        $userKeys = ["username", "password"];

        if (empty($requestData)) {
            abort(400, "Bad Request (empty request)");
        }

        if (!requestContainsAllKeys($requestData, $userKeys)) {
            abort(400, "Bad Request (missing keys)");
        }
        
        $username = $requestData["username"];
        $existingUser = findItemByKey("users", "username", $username);
        if ($existingUser) {
            abort(400, "Bad Request (user already exists)");
        }
        
        $newUser = insertItemByType("users", $userKeys, $requestData);
        unset($newUser["password"]); // Remove password from response for security
        send(201, $newUser);
        break;

    case "DELETE":
        // Delete a user account
        if (empty($requestData) || !isset($requestData["user_id"])) {
            abort(400, "Bad Request (missing user ID)");
        }
        
        $user = findItemByKey("users", "user_id", $requestData["user_id"]);
        if (!$user) {
            abort(404, "User Not Found");
        }

        // Assuming removeUserAndLikes() cleans up related data
        removeUserAndLikes($user["user_id"]);
        $deletedUser = deleteItemByType("users", $user);
        send(200, ["message" => "User deleted successfully", "user_id" => $user["user_id"]]);
        break;
    default:
        abort(405, "Method Not Allowed");
}


// USERS = users

?>







