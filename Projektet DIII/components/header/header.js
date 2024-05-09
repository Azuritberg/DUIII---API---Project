"use strict";


function renderHeader(parentID) {
  
  let header = document.createElement("div");
  parentID.append(header);
  header.id = "header";
  //console.log(instanceData.username);
  header.innerHTML = `
    <div id="headerLeft">
      <img id="logo" src="./icons/rocket-vit.png" alt="">
    </div>
    <div id="headerMiddle">
      <p>The Random Universe.</p>
    </div>
      <div id="headerRight">
        <img id="userbtn" src="./icons/user.png" alt=""> 
        <div id="logincont">
         <button id="login">Login</button>
        </div>
      </div>
    
  `;

  // USER BUTTON and Redirect user to userpage
  let userButton = document.getElementById("userbtn");
  userButton.addEventListener("click", function () {
    const getUserName = {username: localStorage.getItem("username")};  // Get username from localStorage
    renderRedirectUserPage("mainPage", getUserName);
  });

  // HOME BUTTON 
  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);


// login modal  
  renderHeaderLogin();
}

// LOGOUT USER AND REDIRECT TO INDEX PAGE 
function logoutUser() {
  localStorage.removeItem("user");
  console.log("Logout successful");
  //window.location.reload(); // Laddar om sidan för att återställa UI
  window.location.href = 'index.html';
}

// GET HOME PAGE  
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


















  // ${instanceData && instanceData.userName ? instanceData.userName : ""}
  
  // ${instanceData ? instanceData.userName : ""}

  // ${instanceData ? "Logout" : "Login"}



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


    // if (instanceData) {
  //   document.getElementById("userName").addEventListener("click", function () {
  //     renderRedirectUserPage("mainPage", instanceData);
  //   });
  // }

  // document.getElementById("login").addEventListener("click", function () {
  //   if (instanceData) {
  //     logoutUser();
  //   } else {
  //     openModal(document.getElementById("loginModal"));
  //   }
  // });