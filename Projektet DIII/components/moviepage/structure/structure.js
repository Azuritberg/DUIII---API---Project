
function renderMoviesPage(parentID, instanceData) {

    console.log(instanceData);
    let wrapper = document.getElementById(parentID);
    let moviesContainer = document.createElement("main");
    moviesContainer.id = "moviesContainer";
    wrapper.append(moviesContainer);

    moviesContainer.innerHTML = `
    <div id="mainMovieBox">
        <div id="mainLeft">
            <div id="bigPoster"></div>
        </div>
        <div id="topRight">
            <div id="firstBox">
                <h1 id="title">${instanceData.title}</h1>
                <img id="heart" src="../icons/Black-Heart-4.png"alt="">
            </div>
            <p id="aboutMovie">${instanceData.info}</p>
        </div> 
        <div id="bottomRight">
            <p id="info">Similar Movies</p>
            <p id="info">Reviews</p>
            <div id="simularMovies">
                <div id="smallPoster"></div>
                <div id="smallPoster"></div>
                <div id="smallPoster"></div>
                <div id="smallPoster"></div>
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
    console.log(instanceData.poster)
    bigPoster.style.backgroundImage = `url(${instanceData.poster})`;
    similarMovies(STATE.movies, instanceData)
}

// renderMoviesPage("wrapper");


