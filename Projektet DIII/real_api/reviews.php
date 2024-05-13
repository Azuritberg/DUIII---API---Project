<?php
//ta emot anävndar id:t och film id:t och texten som skrivits
//sedan skapa fixa ett nytt review_id så att den går att radera sen.
//sedan skapa ett nytt reveiwobjekt med review_id, user_id, movie_id och review.

require_once ("./functions.php");
$request_method = $_SERVER["REQUEST_METHOD"];
$content_type = $_SERVER["CONTENT_TYPE"];
$request_json = file_get_contents("php://input");
$request_data = json_decode($request_json, true);
$filename = "database_clone.json";
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

        if (!is_numeric($user_id) || !is_numeric($movie_id)) {
            if (!is_numeric($reveiw_id)) {
                send_json("user_id has to be a number", 400);
            } elseif (!is_numeric($movie_id)) {
                send_json("movie_id has to be a number", 400);
            }
        }

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
        send_json($new_review);

    } else {
        send_json("Bad request, only json allowed", 400);
    }

}

if ($request_method == "DELETE") {
    // ska ta bort en review
    // tar emot review_id:t loopar genom alla reviews och hittar reviewn med det id:t
    // tar bort reviewn från databasen och uppdaterar databasen med reviewn borttagen.

    $database = get_database();
    $reviews = $database["reviews"];

}