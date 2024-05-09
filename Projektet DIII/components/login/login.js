"use strict";


function renderHeaderLogin(parentID, instanceData) {

  let overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("overlay");

  let modal = document.createElement("div");
  modal.id = "loginModal";
  modal.classList.add("modal");
  modal.innerHTML = loginModalContent();

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Uppdatera login/logout knappen beroende på användarens inloggningstatus
  updateLoginLogoutButton();

  document.getElementById('login').addEventListener('click', () => openModal(modal));

  overlay.addEventListener('click', () => closeModal(modal));
  document.querySelector('#loginModal').addEventListener('click', event => {
    if (event.target.id === 'register') {
      changeModalContent(modal, 'registerButton');
      let registerButton = document.getElementById("registerButton");
      //console.log(registerButton);
      document.getElementById("registerButton").addEventListener("click", createNewUser);
    } else if (event.target.id === 'logIn') {
      changeModalContent(modal, 'logInButton');
    }
  });

  let loginButton = document.querySelector("#logInButton");
  if (loginButton) {
    loginButton.addEventListener("click", loginUser);
  }
}


function loginModalContent() {
  return `
      <div class="modal-content">
          <h1>Login</h1>
          <form>
              <input type="text" placeholder="Username" id="username"><br><br>
              <input type="password" placeholder="Password" id="password">
              <div class="custom-checkbox">
                  <input type="checkbox" id="eye">
                  <label for="eye"></label>
              </div>

              
              <br><br>
              <button id="logInButton" type="submit">Login</button>
              <div id="noAccount">
                <p>Don't have an account?</p>
                <button id="register">Register</button>
              </div>
          </form>
      </div>
  `;
}

function registerModalContent() {
  return `
      <div class="modal-content">
          <h1>Register</h1>
          <form>
              <input type="text" placeholder="Create username" id="newUsername"><br><br>
              <input type="password" placeholder="Create password" id="newPassword"><br><br>
              <button id="registerButton" type="submit">Register</button>
              <div id="noAccount">
                <p>Already have an account?</p>
                <button id="logIn">Login</button>
              </div>
          </form>
      </div>
  `;
}


// Change modal content
function changeModalContent(modal, type) {
  if (type === 'logInButton') {
    modal.innerHTML = loginModalContent();

  } else if (type === 'registerButton') {
    modal.innerHTML = registerModalContent();
  }
}

// Open and close modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  document.getElementById('overlay').classList.add('active');
  let eyeCheckbox = document.getElementById('eye');
  let passwordInput = document.getElementById('password');

  eyeCheckbox.addEventListener('change', function () {
    if (this.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

}

// Close modal
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  let passwordInput = document.getElementById('password')
  passwordInput.type = "password"
}


// Update BUTTON from Login to Logout
function updateLoginLogoutButton() {
  const loginButton = document.getElementById('login');
  if (isLoggedIn()) {
    loginButton.textContent = 'Logout';
    loginButton.removeEventListener('click', openModal);
    loginButton.addEventListener('click', logoutUser);
  } else {
    loginButton.textContent = 'Login';
    loginButton.removeEventListener('click', logoutUser);
    loginButton.addEventListener('click', () => openModal(document.getElementById('loginModal')));
  }
}

// Check if user is logged in or not in localStorage, return true or false
function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}


// Login User and set user object to localStorage
async function loginUser(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = {
    entity: "login",
    row: { username: username, password: password }
  };

  try {
    const loginUserObject = await State.POST(user);
    // returnera user objektet och sparar det i constanten loginUserObject
    if (loginUserObject != undefined) {
      localStorage.setItem("user", JSON.stringify(loginUserObject.id)); // Sparar user i localStorage

      localStorage.setItem("username", loginUserObject.username); // Sparar username i localStorage
      closeModal(document.getElementById("loginModal"));
      renderRedirectUserPage("mainPage", loginUserObject);
      updateLoginLogoutButton();
      console.log("Login successful");

      window.location.replace('index.html');
    } else {
      console.error("Error logging in", loginUserObject);
    }
  } catch (error) {
    console.error("Error logging in", error);
  }
}


// REGISTER USER and set user object to localStorage
async function createNewUser(event) {
  event.preventDefault();

  let newUsername = document.getElementById("newUsername").value;
  let newPassword = document.getElementById("newPassword").value;

  let newUser = {
    entity: "register",
    row: { username: newUsername, password: newPassword }
  };

  try {
    const registerUserObject = await State.POST(newUser);

    if (registerUserObject != undefined) {

      localStorage.setItem("newUser", JSON.stringify(registerUserObject.id));
      changeModalContent(document.getElementById("loginModal"), "logInButton");

      //window.location.replace(`${window.location.origin}/login`);

      // koden är inte klar.....
      console.log("User registered successfully", registerUserObject);
    } else {
      console.error("Error registering user", registerUserObject);
    }
  } catch (error) {
    console.error("Error registering user", error);
  }
}


// Logout user and go to mainPage 'index.html'
function logoutUser() {
  localStorage.removeItem("user");
  updateLoginLogoutButton();
  //renderHeader(parentID, null);
  console.log("Logout successful");

  window.location.replace('index.html'); // Go to main'index.html' 
}




// localStorage.removeItem("");
// location.reload();