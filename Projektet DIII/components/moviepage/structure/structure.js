
function renderMoviesPage(parentID, instanceData) {
    let similarMoviesArray = similarMovies(STATE.movies, instanceData)
    let wrapper = document.getElementById(parentID);
    let moviesContainer = document.getElementById("mainPage");
    wrapper.append(moviesContainer);

    moviesContainer.innerHTML = `
    <div id="mainMovieBox">
        <div id="mainLeft">
            <div id="bigPoster"></div>
        </div>
        <div id="topRight">
            <div id="firstBox">
                <h1 id="title">${instanceData.title}</h1>
                <img id="heart" src="../icons/white-heart.png"alt="">
            </div>
            <p id="aboutMovie">${instanceData.info}</p>
        </div> 
        <div id="bottomRight">
            <p id="info">Movies within 10 years</p>
            <p id="info">Reviews</p>
            <div id="simularMovies">
                <div class="smallPosters" id="smallPoster0"></div>
                <div class="smallPosters" id="smallPoster1"></div>
                <div class="smallPosters" id="smallPoster2"></div>
                <div class="smallPosters" id="smallPoster3"></div>
            </div>
            <div id="addReview">
                <div id="review"> <!-- Notera ändringen från id till class här -->
                    <h3>Review by: SpaceFan01</h3>
                    <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> <!-- Notera ändringen från id till class här -->
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> <!-- Notera ändringen från id till class här -->
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
                <div id="review"> <!-- Notera ändringen från id till class här -->
                <h3>Review by: SpaceFan01</h3>
                <p>Yeah the film bros are right…you need to see this...</p>
                </div>
            </div>
            <input type="text" placeholder="Add Review" id="userTextInput">
        </div>
    </div>`;
    let bigPoster = document.getElementById("bigPoster");

    bigPoster.style.backgroundImage = `url(${instanceData.poster})`;

    for (let i = 0; i < 4; i++) {

        let poster = document.getElementById("smallPoster" + i)

        poster.id = similarMoviesArray[i].id


        poster.style.backgroundImage = `url('${similarMoviesArray[i].poster}')`

        poster.addEventListener("click", (event) => clearHtml(event, similarMoviesArray));



    }

    const heart = document.getElementById("heart");
    console.log(heart);
        heart.addEventListener("click", function() {
        if (heart.getAttribute("src") != "../icons/white-heart.png") {
            heart.setAttribute("src", "../icons/white-heart.png" )
        } else {
            heart.setAttribute("src", "../icons/white-heart-fill.png")}});
            
}






// renderMoviesPage("wrapper");


/* <img id="heartfill" src="../icons/white-heart-fill.png"alt=""></img> */