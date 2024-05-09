<?php

require_once ("./functions.php");

$request_method = $_SERVER["REQUEST_METHOD"];
$content_type = $_SERVER["CONTENT_TYPE"];
$request_json = file_get_contents("php://input");
$request_data = json_decode($request_json, true);
$filename = "database_clone.json";

if ($request_method != "POST") {
    send_json("Method not allowed", 405);
}

if ($request_method === "POST") {
    $database = get_database();
    $users = $database["users"];

    if (check_content_type($content_type)) {

        if (empty($request_data)) {
            send_json("Empty request", 400);
        }

        $new_username = $request_data["username"];
        $new_password = $request_data["password"];

        if (!isset($new_username, $new_password)) {
            send_json("Bad request, missing parameters", 400);
        }

        // kolla om användarnamnet eller lösenordet inte är tomt
        if (empty(trim($new_username)) || empty(trim($new_password))) {
            if (empty(trim($new_username))) {
                send_json("Username can't be empty", 400);
            } elseif (empty(trim($new_password))) {
                send_json("Password can't be empty", 400);
            }
        }
        // kolla id och ge den nya anävndaren det högsta id:t
        $highest_id = 0;
        foreach ($users as $user) {
            if ($highest_id < $user["user_id"]) {
                $highest_id = $user["user_id"];
            }
        }

        $new_user_id = $highest_id + 1;
        $new_user = ["user_id" => $new_user_id, "username" => $new_username, "password" => $new_password, "liked_movies" => []];
        foreach ($users as $user) {
            if ($new_user["username"] === $user["username"]) {
                send_json("Username already exists", 400);
            }
        }
        $users[] = $new_user;

        $database["users"] = $users;
        file_put_contents($filename, json_encode($database, JSON_PRETTY_PRINT));

        unset($new_user["password"]);
        send_json($new_user, 201);
    } else {
        send_json("Bad request, only json allowed", 400);
    }
}