
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

  let loginButton = document.getElementById("login");
  loginButton.addEventListener("click", function () {
    renderHeaderLogin(parentID);
  });

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