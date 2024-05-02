
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
    clearContent(mainContainer);
  });

  // let loginButton = document.getElementById("login");
  // loginButton.addEventListener("click", function () {
  //   renderHeaderLogin(parentID);
  // });

  let loginButton = document.getElementById("login");

  if (!loginButton.classList.contains('listener-added')) {
    loginButton.classList.contains('listener-added');
    
    loginButton.addEventListener("click", function () {
      console.log("parentID:", parentID); 
    //renderHeaderLogin(parentID);
    // här bara läggs bara klassen till som finns i logoin.js
    openModal(true);
  });
  //loginButton.classList.add('listener-added');
  renderHeaderLogin();
  // detta ska inte ligga här men den ligger ingen annanstans så jag fick skriva den här => renderHeaderLogin();
}


  let homeButton = document.getElementById("logo");
  homeButton.addEventListener("click", getHome);
}

function clearContent(parentID, instanceData) {
  parentID.innerHTML = "";
  renderUserPage("mainContainer", instanceData);
}


function getHome(event) {
  renderApp();
}

