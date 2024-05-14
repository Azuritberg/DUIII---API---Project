<?php
//tar emot anävndar id:t och film id:t och texten som skrivits

ini_set("display_errors", 0);

require_once ("./functions.php");
$request_method = $_SERVER["REQUEST_METHOD"];
$content_type = $_SERVER["CONTENT_TYPE"];
$request_json = file_get_contents("php://input");
$request_data = json_decode($request_json, true);
$filename = "database.json";
$allowed_methods = ["POST", "DELETE"];

if (!in_array($request_method, $allowed_methods)) {
    send_json("Method not allowed", 405);
}

if ($request_method == "POST") {

    $database = get_database();
    $reviews = $database["reviews"];

    if (check_content_type($content_type)) {

        if (empty($request_data)) {
            send_json("Empty request", 400);
        }

        $user_id = $request_data["user_id"];
        $movie_id = $request_data["movie_id"];
        $review_text = $request_data["review"];

        if (!isset($user_id, $movie_id, $review_text)) {
            send_json("Missing parameters", 400);
        }

        if (empty(trim($user_id)) || empty(trim($movie_id))) {
            send_json("Bad request", 400);
        }

        if (empty(trim($review_text))) {
            send_json("Review can't be empty", 400);
        }

        //kollar att user id och movie id är siffror
        if (!is_numeric($user_id) || !is_numeric($movie_id)) {
            if (!is_numeric($reveiw_id)) {
                send_json("user_id has to be a number", 400);
            } elseif (!is_numeric($movie_id)) {
                send_json("movie_id has to be a number", 400);
            }
        }

        //ger varje review ett unikt id.
        $highest_review_id = 0;
        foreach ($reviews as $review) {
            if ($highest_review_id < $review["review_id"]) {
                $highest_review_id = $review["review_id"];
            }
        }
        $new_review_id = $highest_review_id + 1;

        $new_review = ["review_id" => $new_review_id, "movie_id" => $movie_id, "user_id" => $user_id, "review" => $review_text];

        if ($new_review != null) {
            $reviews[] = $new_review;
        }

        $database["reviews"] = $reviews;
        file_put_contents($filename, json_encode($database, JSON_PRETTY_PRINT));
        send_json($new_review, 201);
    }

}

if ($request_method == "DELETE") {
    //tar emot ett "review_id"

    $database = get_database();
    $reviews = $database["reviews"];

    if (check_content_type($content_type)) {

        if (empty($request_data)) {
            send_json("Empty request", 400);
        }

        $review_id = $request_data["review_id"];

        if (!isset($review_id)) {
            send_json("Missing paramater", 400);
        }

        if (empty(trim($review_id))) {
            send_json("Bad request", 400);
        }

        if (!is_numeric($review_id)) {
            send_json("review_id has to be a number", 400);
        }

        //loopar genom alla reviews och splicear reviewn man vill ta bort från arrayen
        $deleted_review = null;
        foreach ($reviews as $index => $review) {
            if ($review_id == $review["review_id"]) {
                $deleted_review = $review;
                array_splice($reviews, $index, 1);
            }
        }

        //kollar att reviewn man vill ta bort inte är null och uppdaterar databasen
        if ($deleted_review != null) {
            $database["reviews"] = $reviews;
            file_put_contents($filename, json_encode($database, JSON_PRETTY_PRINT));
            send_json($deleted_review);
        } else {
            send_json("Review not found", 404);
        }

    } else {
        send_json("Bad request, only json allowed", 400);
    }
}