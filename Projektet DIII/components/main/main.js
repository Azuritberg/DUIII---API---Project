async function renderMain(parentID, instanceData) {

    let mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    parentID.append(mainContainer);

    let pDom = document.createElement("p");
    pDom.id = "infoText";
    pDom.innerHTML = `Not sure what to watch tonight? <br> Don’t worry, we’ll help you out.`;
    mainContainer.append(pDom);

    let mainBox = document.createElement("div");
    mainBox.id = "mainBox";
    mainContainer.append(mainBox);
    for (let i = 1; i <= 10; i++) {
        let photoDiv = document.createElement("div");
        photoDiv.id = "photo" + i;
        let poster = document.createElement("img");
        photoDiv.append(poster);
        let randomNumber = getRandomPoster(instanceData.MOVIES);
        console.log(randomNumber);
        poster.src = instanceData.MOVIES[randomNumber].poster;
        mainBox.append(photoDiv);
    }



    let button = document.createElement("button");
    button.id = "mainButton";
    button.textContent = "Regenerate";
    mainContainer.append(button);
}

function getRandomPoster(movies) {
    // console.log(movies);
    const randomIndex = getRandomNumber(movies.length);
    return randomIndex;
}

function getRandomNumber(max, min = 0) {
    return min + Math.floor(max * Math.random());
}