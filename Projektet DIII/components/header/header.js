
function renderHeader(parentID) {
  let header = document.createElement("div");
  parentID.append(header);
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
  userName.addEventListener("click", function () {
    clearContent("mainPage");
  });


  // login modal   Vi kanske borde byta namn på denna?
  renderHeaderLogin();


  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);
}

function clearContent(parentID, instanceData) {
  document.getElementById(parentID).innerHTML = "";
  renderUserPage("mainPage", instanceData);
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

  // let loginButton = document.getElementById("login");
  // loginButton.addEventListener("click", function () {
  //   renderHeaderLogin(parentID);
  // });

  // let loginButton = document.getElementById("login");
  // //   loginButton.addEventListener("click", function () {
  // //     console.log("parentID:", parentID);
  // //   openModal(loginModal);
  // // });
  // renderHeaderLogin();