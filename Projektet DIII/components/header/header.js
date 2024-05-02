function renderHeader(parentID) {

  let header = document.createElement("div");
  parentID.append(header)
  header.id = "header";
  header.innerHTML = `
        <div id="headerLeft">
          <img id="logo" src="./icons/rocket-vit.png" alt="">
        </div>
        <div id="headerMiddle">
            <p>The Random Universe.</p>
        </div>
        <div id="headerRight">
          <div id="userName">Username</div>
          <button id="login">Login</button>
        </div>
    `;

  let userName = document.getElementById("userName");
  let loginButton = document.getElementById("login");
  loginButton.addEventListener("click", renderHeaderLogin(parentID));

  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);

}

// function getHome(event) {
//   renderApp();
// }

function getHome(event) {
  if (!document.querySelector("#mainBox")) {
    document.getElementById("moviesContainer").remove();
    renderMain(document.querySelector("main"), savedMovies);
  }
}

// function sameMoviesMain(savedMovies) {

//   for (let i = 0; i < savedMovies.length; i++) {
//     let posterId = i + 1;
//     let photoDiv = document.createElement("div");
//     photoDiv.id = "photo" + posterId;
//     photoDiv.classList.add("posterDiv")
//     let poster = document.createElement("img");
//     poster.classList.add("poster");
//     photoDiv.append(poster);

//     mainBox.append(photoDiv);

//     let moviePoster = photoDiv.querySelector(".poster");
//     moviePoster.setAttribute("id", savedMovies[i].id);
//     moviePoster.src = savedMovies[i].poster;
//   }
// }

// regenerate måste vara en GET istället för att den bara kör samma funktioner nu. då kanske jag kan få det att funka. 