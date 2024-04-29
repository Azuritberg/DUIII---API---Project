<?php

require_once("helpers.php");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
} else {
    header("Access-Control-Allow-Origin: *");
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestData = getRequestData();

if ($requestMethod == "GET") // Get one or all characters
{
    if (isset($requestData["id"])) {
        $id = $requestData["id"];
        $character = findItemByKey("characters", "id", $id);
        
        if ($character == false) {
            abort(404, "character Not Found");
        }
        
        send(200, $character);
    }

    $user = getUserFromToken($requestData["token"]);

    $characters = getDatabaseByType("characters");
    foreach ($characters as $index => &$character) {
        if ($character["user_id"] != $user["id"]) {
            array_splice($characters, $index, 1);
        }
    }
    send(200, $characters);
}
else if ($requestMethod == "POST") // Create a new character (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $characterKeys = ["token", "name", "rating", "favorite"];

    if (requestContainsAllKeys($requestData, $characterKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["token"]);

    // Make sure that the creator (user_id) is the same as the owner of the token
    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }

    $character = findItemByKey("characters", "name", $requestData["name"]);
 
    if ($character != false) {
        abort(400, "Bad Request (character already exists)");
    }

    $characterKeys[] = "user_id";
    $requestData["user_id"] = $user["id"];
    $newcharacter = insertItemByType("characters", $characterKeys, $requestData);
    send(201, $newcharacter);
}
else if ($requestMethod == "PATCH") // Like or unlike a character (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $likeKeys = ["id", "token"];

    if (requestContainsAllKeys($requestData, $likeKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $user = getUserFromToken($requestData["token"]);

    // Make sure that the "liker" (user_id) is the same as the owner of the token
    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }
    
    $character = findItemByKey("characters", "id", $requestData["id"]);

    if ($character == false) {
        abort(404, "character Not Found");
    }

    // Toggle the user "favorite"
    if (isset($requestData["favorite"])) {
        if ($character["favorite"] == false) {
            $character["favorite"] = true;
        } else {
            $character["favorite"] = false;
    
        }
    }

    // Change "rating"
    if (isset($requestData["rating"])) {
        $character["rating"] = $requestData["rating"];
    }

    $updatedcharacter = updateItemByType("characters", $character);
    send(200, $updatedcharacter);
}
else if ($requestMethod == "DELETE") // Delete a character (token required)
{
    if (empty($requestData)) {
        abort(400, "Bad Request (empty request)");
    }

    $deleteKeys = ["id", "token"];

    if (requestContainsAllKeys($requestData, $deleteKeys) == false) {
        abort(400, "Bad Request (missing keys)");
    }

    $character = findItemByKey("characters", "id", $requestData["id"]);

    if ($character == false) {
        abort(404, "character Not Found");
    }

    $user = getUserFromToken($requestData["token"]);

    if ($user == false) {
        abort(400, "Bad Request (invalid token)");
    }

    if ($user == false || $character["user_id"] != $user["id"]) {
        abort(400, "Bad Request (invalid token)");
    }

    $deletedcharacter = deleteItemByType("characters", $character);
    send(200, $deletedcharacter);
}
else
{
    abort(405, "Method Not Allowed");
}

?>