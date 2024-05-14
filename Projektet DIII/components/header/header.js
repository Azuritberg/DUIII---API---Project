"use strict";


function renderHeader(parentID, instanceData) {
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
      <img id="userbtn" src="./icons/user.png" alt="" style="display: none;"> 
      <div id="logincont">
       <button id="login">Login</button>
      </div>
    </div>
  `;

  // Klicka på userButton om användaren är inloggad
  let userButton = document.getElementById("userbtn");
  userButton.addEventListener("click", function () {
    let usernameStorage=localStorage.getItem("username")
    let users_copy=State.GET("user")
    for (let i = 0; i < users_copy.length; i++) {
      if (users_copy[i].username===usernameStorage) {
        const instanceData =  users_copy[i]; // Get username from localStorage instanceData är ett objekt som skickas med till renderRedirectUserPage om användaren klickar på userbtn
        renderRedirectUserPage("mainPage", instanceData);
      }
      
    }
    
  });

  // Visa eller dölj userButton beroende baserat på om användaren är inloggad
  userButton.style.display = isLoggedIn() ? 'block' : 'none';

  document.getElementById("login").addEventListener("click", function () {
    if (instanceData && isLoggedIn()) {
      logoutUser();
    } else {
      openModal(document.getElementById("loginModal"));
    }
  });

  renderHeaderLogin();
  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);

}

function logoutUser() {
  localStorage.removeItem("user");  // Remove user from localStorage
  localStorage.removeItem("username"); // Remove username from localStorage
  console.log("Logout successful");

  // Gör userButton osynlig
  const userButton = document.getElementById("userbtn");
  userButton.style.display = 'none';

  // Omdirigera till startsidan eller uppdatera sidan
  window.location.href = 'index.html';
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