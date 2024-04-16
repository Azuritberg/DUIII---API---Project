function renderMain(parentID) {

    let main = document.createElement("div");
    parentID.append(main);
    main.id = "mainBox";
    main.innerHTML = `
        <div id="photo1"></div>
        <div id="photo2"></div>
        <div id="photo3"></div>
        <div id="photo4"></div>
        <div id="photo5"></div>
        <div id="photo6"></div>
        <div id="photo7"></div>
        <div id="photo8"></div>
        <div id="photo9"></div>
        <div id="photo10"></div>`
};