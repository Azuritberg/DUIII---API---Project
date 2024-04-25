async function renderMain(parentID, instanceData) {

    let mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    parentID.append(mainContainer);

    // let pDom = document.createElement("p");
    // pDom.id = "infoText";
    // pDom.innerHTML = `Not sure what to watch tonight? <br> Don’t worry, we’ll help you out.`;
    // mainContainer.append(pDom);

    let mainBox = document.createElement("div");
    mainBox.id = "mainBox";
    mainContainer.append(mainBox);


    for (let i = 1; i <= 10; i++) {
        let photoDiv = document.createElement("div");
        photoDiv.id = "photo" + i;
        photoDiv.classList.add("posterDiv")
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

        let p = document.createElement("p")

        p.textContent = "(" + instanceData.MOVIES[randomIndexes[i]].title + ")";

        posterContainer.appendChild(p)



        poster.addEventListener("mouseout", function () {
            poster.style.filter = '';
            p.style.display = ""


        })

        poster.addEventListener("mousedown", function () {
            poster.style.filter = 'brightness(100%)';
            p.style.display = "none"


        })

        poster.addEventListener("mouseup", function () {
            poster.style.filter = 'brightness(50%)';
            p.style.display = "inline"


        })


    }
    generatePosters(randomIndexes, instanceData.MOVIES);

    let button = document.createElement("button");
    button.id = "mainButton";
    button.textContent = "Regenerate";
    mainContainer.append(button);

    button.addEventListener("click", (event) => generateNewMovies(event, instanceData));
}

function generatePosters(randomIndexArray, instanceData) {

    for (let i = 0; i < randomIndexArray.length; i++) {

        let posterId = i + 1;
        let posterContainer = document.getElementById("photo" + posterId);

        let moviePoster = posterContainer.querySelector(".poster");
        moviePoster.src = instanceData[randomIndexArray[i]].poster;
    }
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

function generateNewMovies(event, instanceData) {

    let randomIndexes = getRandomPoster(instanceData.MOVIES);
    generatePosters(randomIndexes, instanceData.MOVIES);
}
