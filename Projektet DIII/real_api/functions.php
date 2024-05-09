<?php

function send_json($data, $status = 200)
{
    header("Content-type: application/json");
    http_response_code($status);
    $json = json_encode($data);
    echo $json;
    exit();
}

function get_database()
{
    $database_json = file_get_contents("database_clone.json");
    $database = json_decode($database_json, true);
    if (isset($database) == false) {
        send_json("the database does not exist", 500);
    }
    return $database;
}

function check_content_type($type)
{
    if ($type !== "application/json") {
        send_json("Wrong content type", 400);
    } else {
        return true;
    }
}

// function request_data()
// {
//     $json = file_get_contents("php://input");
//     $data = json_decode($json, true);
//     // if ($data === null) {
//     // }
//     return $data;
// }