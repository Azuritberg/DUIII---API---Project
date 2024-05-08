
function renderHeader(parentID, instanceData) {
  //console.log(instanceData);
  //Sconsole.log(parentID);
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
      <div id="userName">${instanceData ? instanceData.userName : ""}</div>
      <button id="login">Login</button>
    </div>
  `;

  let userName = document.getElementById("userName");
  userName.addEventListener("click", function () {
    renderRedirectUserPage("mainPage");
  });


// login modal  
  renderHeaderLogin();


  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);
}

// function clearContent(parentID, instanceData) {
//   document.getElementById(parentID).innerHTML = "";
//   renderUserPage("mainPage", instanceData);
// }


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
  //   loginButton.addEventListener("click", function () {
  //     console.log("parentID:", parentID); 
  //   openModal(loginModal);
  // });
  // renderHeaderLogin();