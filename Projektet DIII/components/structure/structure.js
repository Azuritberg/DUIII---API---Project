async function renderStructure(instanceData) {

    console.log(instanceData);
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

    console.log(await instanceData);
    renderHeader(document.querySelector("header"));
    renderMain(document.querySelector("main"), instanceData);
    // return {
    //     header: container.querySelector("header"),
    //     main: container.querySelector("main")
    // }
};
