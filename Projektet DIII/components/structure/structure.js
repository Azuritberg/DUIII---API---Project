async function renderStructure() {

    // fetch(movie_request)
    //     .then(response => {
    //         console.log(response.json());
    //     })

    const movie_request = new Request("/databas/movies.json");
    const movie_response = await fetch(movie_request);
    const movie_resource = await movie_response.json();

    const container = document.querySelector("#wrapper");
    container.innerHTML = `
    <header></header>
    <main id="mainPage"></main>
    `;

    console.log(movie_resource);
    renderHeader(document.querySelector("header", movie_resource));
    renderMain(document.querySelector("main"), movie_resource);
    // return {
    //     header: container.querySelector("header"),
    //     main: container.querySelector("main")
    // }
};
