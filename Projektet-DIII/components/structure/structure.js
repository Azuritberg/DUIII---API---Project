"use strict";

//  RENDERSTRUCTURE 
async function renderStructure(movies) {

    const container = document.querySelector("#wrapper");
    container.innerHTML = `
    <header></header>
    <main id="mainPage"></main>
    `;

    renderHeader(document.querySelector("header"));

    // Klicka på userButton om användaren är inloggad 
    if (localStorage.getItem("loadedPage") === "renderUserPage" && !localStorage.getItem("user")) {
        renderMain("mainPage", movies);
    } else if (localStorage.getItem("loadedPage")) {
        window[localStorage.getItem("loadedPage")](...JSON.parse(localStorage.getItem("loadedPage-argumet")));
    } else {
        renderMain("mainPage", movies);
    }
};
