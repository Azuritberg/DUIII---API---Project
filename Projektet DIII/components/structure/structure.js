"use strict";

async function renderStructure(movies) {

    // fetch(movie_request)
    //     .then(response => {
    //         console.log(response.json());
    //     })

    // const movie_request = new Request("/databas/movies.json");
    // const movie_response = await fetch(movie_request);
    // const movie_resource = await movie_response.json();
    // STATE.movies = movie_resource;

    const container = document.querySelector("#wrapper");
    container.innerHTML = `
    <header></header>
    <main id="mainPage"></main>
    `;

    renderHeader(document.querySelector("header"));


    // if(localStorage.getItem("loadedPage")) {
    //     window[localStorage.getItem("loadedPage")](...JSON.parse(localStorage.getItem("loadedPage-argumet")));
    // } else if (!localStorage.getItem("user") && localStorage.getItem("loadedPage") === "renderMoviesPage") {
    //     window[localStorage.getItem("loadedPage")](...JSON.parse(localStorage.getItem("loadedPage-argumet")));
    // } else {
    //     renderMain("mainPage", movies);
    // }
    
    if(localStorage.getItem("loadedPage") === "renderUserPage" && !localStorage.getItem("user")) {
        renderMain("mainPage", movies);
    } else if (localStorage.getItem("loadedPage")) {
        window[localStorage.getItem("loadedPage")](...JSON.parse(localStorage.getItem("loadedPage-argumet")));
    } else {
        renderMain("mainPage", movies);
    }
};
