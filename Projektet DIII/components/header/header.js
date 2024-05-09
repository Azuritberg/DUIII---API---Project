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

  let userbtn = document.getElementById("userbtn");
  userbtn.addEventListener("click", function () {
    const instanceData = {username: localStorage.getItem("username")};
    renderRedirectUserPage("mainPage", instanceData);
  });

  // Visa eller dölj userbtn baserat på om användaren är inloggad
  userbtn.style.display = isLoggedIn() ? 'block' : 'none';

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


    // login modal  
  renderHeaderLogin();



function logoutUser() {
  localStorage.removeItem("user");
  console.log("Logout successful");

  // Gör usrbtn osynlig
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























  //console.log(instanceData);
  //Sconsole.log(parentID);






  // ${instanceData && instanceData.userName ? instanceData.userName : ""}
  
  // ${instanceData ? instanceData.userName : ""}

  // ${instanceData ? "Logout" : "Login"}




// function renderHeader(parentID, instanceData) {
//   //console.log(instanceData);
//   //Sconsole.log(parentID);
//   let header = document.createElement("div");
//   parentID.append(header);
//   header.id = "header";
//   header.innerHTML = `
//     <div id="headerLeft">
//       <img id="logo" src="./icons/rocket-vit.png" alt="">
//     </div>
//     <div id="headerMiddle">
//       <p>The Random Universe.</p>
//     </div>
//     <div id="headerRight">
//       <div id="userName">${instanceData ? instanceData.userName : ""}</div>
//       <button id="login">Login</button>
//     </div>
//   `;

//   let userName = document.getElementById("userName");
//   userName.addEventListener("click", function () {
//     renderRedirectUserPage("mainPage");
//   });


// // login modal  
//   renderHeaderLogin();


//   let homeButton = document.getElementById("logo");
//   homeButton.addEventListener("click", getHome);
// }

// // function clearContent(parentID, instanceData) {
// //   document.getElementById(parentID).innerHTML = "";
// //   renderUserPage("mainPage", instanceData);
// // }


// function getHome(event) {
//   if (!document.querySelector("#mainBox")) {
//     if (document.getElementById("mainMovieBox")) {
//       document.getElementById("mainMovieBox").remove();
//       renderMain(document.querySelector("main"), savedMovies);
//     } else {
//       document.getElementById("userContainer").remove();
//       renderMain(document.querySelector("main"), savedMovies);
//     }
//   }
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