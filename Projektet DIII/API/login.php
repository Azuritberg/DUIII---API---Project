<?php

ini_set("display_errors", 0);

require_once ("./functions.php");

$requestMethod = $_SERVER["REQUEST_METHOD"];
$content_type = $_SERVER["CONTENT_TYPE"];
$request_json = file_get_contents("php://input");
$request_data = json_decode($request_json, true);

if ($requestMethod !== "POST") {
    send_json("Method not allowed", 405);
}

if ($requestMethod == "POST") {
    $database = get_database();
    $users = $database["users"];
    if (check_content_type($content_type)) {

        if (empty($request_data)) {
            send_json("Empty request", 400);
        }

        $request_username = $request_data["username"];
        $request_password = $request_data["password"];

        if (!isset($request_username, $request_password)) {
            send_json("Bad request, missing parameters", 400);
        }

        //hitta användaren i databasen

        if (!empty($users)) {
            foreach ($users as $user) {
                // vill kolla om användaren finns genom att kolla användarnamn och password stämmer överens, eventuellt ge tillbaka id på användaren
                $username = $user["username"];
                $password = $user["password"];

                if ($request_username === $username && $request_password === $password) {
                    // $found_user = [$user["user_id"], $user["username"], $user["liked_movies"]];
                    $found_user = [
                        "user_id" => $user["user_id"],
                        "username" => $user["username"],
                        "liked_movies" => $user["liked_movies"],
                    ];
                    send_json($found_user);
                    break;
                }
            }
            send_json("user not found", 404);
        }
    }
    send_json("Bad request, only json allowed", 400);
}