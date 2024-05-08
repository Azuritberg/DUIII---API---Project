function renderHeader(parentID, instanceData) {

  // Skapar ett header-element
  let header = document.createElement("div");
  parentID.appendChild(header);
  header.id = "header";

  header.innerHTML = `
    <div id="headerLeft">
      <img id="logo" src="./icons/rocket-vit.png" alt="">
    </div>
    <div id="headerMiddle">
      <p>The Random Universe.</p>
    </div>
    <div id="headerRight">
    <div id="userName">${instanceData ? instanceData.name: ""}</div>
    <button id="login">Login</button>
    </div>
  `;

  // Lägg till event listeners
  let userName = document.getElementById("userName");
  userName.addEventListener("click", function () {
    renderRedirectUserPage("mainPage");
  });

  renderHeaderLogin();

  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);
}


function getHome(event) {
  if (!document.querySelector("#mainBox")) {
    if (document.getElementById("mainMovieBox")) {
      document.getElementById("mainMovieBox").remove();
      renderMain(document.querySelector("main"), savedMovies);
    } else {
      document.getElementById("userContainer").remove();
      renderMain(document.querySelector("main"), savedMovies);
    }
  }
}




// document.addEventListener("DOMContentLoaded", () => {
//   let parentElement = document.getElementById('headerContainer'); // Anta att detta är ID för elementet där headern ska läggas
//   renderHeader(parentElement);
// });


// function clearContent(parentID, instanceData) {
//   document.getElementById(parentID).innerHTML = "";
//   renderUserPage("mainPage", instanceData);
// }






  // let loginButton = document.getElementById("login");
  // loginButton.addEventListener("click", function () {
  //   renderHeaderLogin(parentID);
  // });

  // let loginButton = document.getElementById("login");
  //   loginButton.addEventListener("click", function () {
  //     console.log("parentID:", parentID); 
  //   openModal(loginModal);
  // });
  // renderHeaderLogin();