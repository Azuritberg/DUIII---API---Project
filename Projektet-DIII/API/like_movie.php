<?php
//tar emot användar id:t och ett film id.

ini_set("display_errors", 0);

require_once ("./functions.php");
$request_method = $_SERVER["REQUEST_METHOD"];
$content_type = $_SERVER["CONTENT_TYPE"];
$request_json = file_get_contents("php://input");
$request_data = json_decode($request_json, true);
$filename = "database.json";

if ($request_method != "PATCH") {
    send_json("Method not allwoed", 405);
}

if ($request_method === "PATCH") {

    $database = get_database();
    $users = $database["users"];

    if (empty($request_data)) {
        send_json("Empty request", 400);
    }

    $current_user = $request_data["user_id"];
    $liked_movie = $request_data["id"];

    //kollar att alla parametrar skickats med
    if (!isset($current_user, $liked_movie)) {
        send_json("bad request, missing paramaters", 400);
    }

    //kollar så att inga fält är tomma
    if (empty(trim($current_user)) || empty(trim($liked_movie))) {
        if (empty(trim($current_user))) {
            send_json("user_id has to be included", 400);
        } elseif (empty(trim($liked_movie))) {
            send_json("liked_movie has to be included", 400);
        }
    }

    //kollar så att det är nummer som skickas med
    if (!is_numeric($current_user) || !is_numeric($liked_movie)) {
        if (!is_numeric($current_user)) {
            send_json("user_id has to be a number", 400);
        } elseif (!is_numeric($liked_movie)) {
            send_json("liked_movie has to be a number", 400);
        }
    }

    // hittar användaren baserat på id:t som skickas med
    $found_user = null;
    foreach ($users as $user) {
        if ($current_user === $user["user_id"]) {
            $found_user = $user;
            break;
        }
    }

    if ($found_user === null) {
        send_json("user not found", 404);
    }

    // kollar om den gillade filmen redan finns i arrayen och uppdaterar baserat på det
    $index = array_search($liked_movie, $found_user["liked_movies"]);
    if (in_array($liked_movie, $found_user["liked_movies"])) {
        if ($index !== false) {
            // unset($found_user["liked_movies"][$index]);
            array_splice($found_user["liked_movies"], $index, 1);
        }
    } elseif (!in_array($liked_movie, $found_user["liked_movies"])) {
        $found_user["liked_movies"][] = $liked_movie;
    }

    // loopar igenom alla användare igen och uppdaterar med ändringarna gjort på found_user
    foreach ($users as &$user) {
        if ($found_user["user_id"] === $user["user_id"]) {
            $user = $found_user;
            break;
        }
    }

    //uppdaterar databasen och skickar tillbaka användaren med den uppdaterade arrayen. 
    $database["users"] = $users;
    file_put_contents($filename, json_encode($database, JSON_PRETTY_PRINT));
    unset($found_user["password"]);
    send_json($found_user);
}













