function renderStructure() {

    const container = document.querySelector("#wrapper");
    container.innerHTML = `
        <header></header>
        <main></main>
    `;
    return {
        header: container.querySelector("header"),
        main: container.querySelector("main"),
    }
};
