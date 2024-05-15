"use strict";


// PRIVATE

const STATE = {
    movies: [],
    user: [],
    reviews: []
}

async function renderApp() {
    const movie_request = new Request("./API/movies.php");
    const movie_response = await fetch(movie_request);
    const movie_resource = await movie_response.json();
    STATE.movies = movie_resource

    const user_request = new Request("./API/users.php");
    const user_response = await fetch(user_request);
    const user_resource = await user_response.json();
    STATE.user = user_resource;

    const reviews_request = new Request("./API/reviews.php");
    const reviews_response = await fetch(reviews_request);
    const reviews_resource = await reviews_response.json();
    STATE.reviews = reviews_resource;


    let movies = State.GET("movies");
    let users = State.GET("user");
    let reviews = State.GET("reviews");
    renderStructure();
}
renderApp();



//  PUBLIC CLONE
const State = {

    GET(entity) {
        const dataClone = JSON.parse(JSON.stringify(STATE[entity]));
        return dataClone;
    },
    POST: async function (data) {
        switch (data.entity) {
            case "login":
                // console.log(data);
                // console.log(JSON.stringify(data.row));
                // console.log(JSON.parse(data.row));
                const loginRequest = new Request("./API/login.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                });
                let loginResource = await fetcher(loginRequest);
                if (loginResource !== undefined) {
                    console.log(loginResource);
                    STATE.user.push(loginResource);
                    return loginResource;
                }
                //console.log(loginResource);
                break;
            case "register":
                console.log(data);
                const registerRequest = new Request("./API/users.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                })
                let registerResource = await fetcher(registerRequest);
                return registerRequest
                break;
            case "reviews":
                const reviewRequest = new Request("./API/reviews.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                })
                let reviewResource = await fetcher(reviewRequest);
                if (reviewResource != undefined) {

                }
                break;
            default:
                break;
        }
    },
    PATCH: async function (data) {
        switch (data.entity) {
            case "likes":
                const likedMovieRequest = new Request("./API/like_movie.php", {
                    method: "PATCH",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" },
                })
                let likedMovieResource = await fetcher(likedMovieRequest);
                if (likedMovieResource !== undefined) {
                    for (let i = 0; i < STATE.user.length; i++) {
                        let username = localStorage.username;
                        if (likedMovieResource.username === username) {
                            STATE.user[i] = likedMovieResource;
                            checkLikedMovies();
                            break;
                        }
                    }
                }
                break;
            default:
                break;
        }
    },
    DELETE: async function (data) {
        switch (data.entity) {
            case "reviews":
                const removeLikedMovieRequest = new Request("./API/reviews.php", {
                    method: "DELETE",
                    body: JSON.stringify({ id: data.row }),
                    headers: { "Content-Type": "application/json" },
                })
                let removeLikedMovieResource = await fetcher(removeLikedMovieRequest);
                if (removeLikedMovieResource !== undefined) {
                    // Ta bort review från state och rendera om
                    const result = await removeLikedMovieResource.json();
                    console.log(result);

                    const index = STATE.review_id.indexOf(data.row);
                    if (index > -1) {
                        STATE.review_id.splice(index, 1);
                        renderUserReviews(STATE.user[0]);
                    }
                } 
                break;
            default:
                break;
        }
    },
}


async function fetcher(request) {

    try {
        let response = await fetch(request);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        let resource = await response.json();
        return resource;
    } catch (error) {
        console.warn(error);
    }
}





// let removeLikedMovieResource = fetcher(removeLikedMovieRequest);
// if (removeLikedMovieResource !== undefined) {
//     for (let i = 0; i < STATE.review_id.length; i++) {
//         if (STATE.review_id[i] === data.row) {
//             STATE.review_id.splice(i, 1);
//             renderUserReviews(STATE.user[0]);
//             break;
//         }
//     }
// }