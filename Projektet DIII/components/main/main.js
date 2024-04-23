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
        poster.classList.add("poster");
        photoDiv.append(poster);


        mainBox.append(photoDiv);
    }

    let randomIndexes = getRandomPoster(instanceData.MOVIES);
    console.log(randomIndexes);
    for (let i = 0; i < randomIndexes.length; i++) {

        console.log(randomIndexes[i]);
        let posterId = i + 1;

        let posterContainer = document.getElementById("photo" + posterId);

        let poster = posterContainer.querySelector(".poster");

        poster.src = instanceData.MOVIES[randomIndexes[i]].poster;
    }

    let button = document.createElement("button");
    button.id = "mainButton";
    button.textContent = "Regenerate";
    mainContainer.append(button);
}

function getRandomPoster(movies) {
    let randomNumbers = new Set();

    while (randomNumbers.size < 10) {
        randomNumbers.add(getRandomNumber(movies.length));
    }

    return Array.from(randomNumbers);
}

function getRandomNumber(max, min = 0) {
    return min + Math.floor(max * Math.random());
}
