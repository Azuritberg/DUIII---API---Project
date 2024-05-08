function renderHeader(parentID, instanceData) {
  
  let header = document.createElement("div");
  parentID.append(header);
  header.id = "header";
  //console.log(instanceData.username);
  //console.log(parentID);
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

  if (instanceData) {
    document.getElementById("userName").addEventListener("click", function () {
      renderRedirectUserPage("mainPage", instanceData);
    });
  }

  document.getElementById("login").addEventListener("click", function () {
    if (instanceData) {
      logoutUser();
    } else {
      openModal(document.getElementById("loginModal"));
    }
  });


  // ${instanceData && instanceData.userName ? instanceData.userName : ""}
  
  // ${instanceData ? instanceData.userName : ""}

  // ${instanceData ? "Logout" : "Login"}

// login modal  
  renderHeaderLogin(insanceData, parentID);


  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);
}


function logoutUser() {
  localStorage.removeItem("user");
  console.log("Logout successful");
  //window.location.reload(); // Laddar om sidan för att återställa UI
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