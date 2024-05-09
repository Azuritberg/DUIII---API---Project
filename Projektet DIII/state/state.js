"use strict";


// PRIVATE

const STATE = {
    movies: [],
    user: [],
    reviews: []
}

async function renderApp() {
    const movie_request = new Request("/API/movies.php");
    const movie_response = await fetch(movie_request);
    const movie_resource = await movie_response.json();
    STATE.movies = movie_resource;


    let movies = State.GET("movies");
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
                const loginRequest = new Request("../API/login.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                });
                let loginResource = await fetcher(loginRequest);
                return loginResource
                //console.log(loginResource);
                break;
            case "register":
                console.log(data);
                const registerRequest = new Request("../API/users.php", {
                    method: "POST",
                    body: JSON.stringify(data.row),
                    headers: { "Content-Type": "application/json" }
                })
                let registerResource = await fetcher(registerRequest);
                return registerRequest
                break;
            case "reviews":
                const reviewRequest = new Request("", {
                    method: "POST",
                    body: data.row,
                    headers: { "Content-Type": "application/json" }
                })
                let reviewResource = await fetcher(reviewRequest);
                break;
            default:
                break;
        }
    },
    PATCH: async function (data) {
        switch (data.entity) {
            case "users":
                const likedMovieRequest = new Request("", {
                    method: "PATCH",
                    body: data.row,
                    headers: { "Content-Type": "application/json" },
                })
                let likedMovieResource = fetcher(likedMovieRequest);
                break;
            default:
                break;
        }
    },
    DELETE: async function (data) {
        switch (data.entity) {
            case "users":
                const removeLikedMovieRequest = new Request("", {
                    method: "DELETE",
                    body: data.row,
                    headers: { "Content-Type": "application/json" },
                })
                let removeLikedMovieResource = fetcher(removeLikedMovieRequest);
                break;
            default:
                break;
        }
    },
}


async function fetcher(request) {

    try {
        let response = await fetch(request);
        let resource = await response.json();
        return resource;
    } catch (error) {
        console.warn(error);
    }
}
