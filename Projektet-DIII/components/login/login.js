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
          <form id="loginForm">
              <input type="text" placeholder="Username" id="username"><br>
              <div id="passwordHolder">
                <input type="password" placeholder="Password" id="password">
                <div class="custom-checkbox">
                    <input type="checkbox" id="eye">
                    <label for="eye"></label>
                </div>
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
          <form id="registerForm">
              <input type="text" placeholder="Create username" id="newUsername"><br>
              <div id="passwordHolder">
                <input type="password" placeholder="Create password" id="newPassword"><br>
                <div class="custom-checkbox">
                      <input type="checkbox" id="eye">
                      <label for="eye"></label>
                  </div>
                </div>
              <br><br>
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
    // Add event listeners to the new login form
    document.getElementById('logInButton').addEventListener('click', loginUser);
  } else if (type === 'registerButton') {
    modal.innerHTML = registerModalContent();
    // Add event listeners to the new register form
    document.getElementById("registerButton").addEventListener("click", createNewUser);
  }
  setupPasswordVisibilityToggle();
}

// Open and close modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  document.getElementById('overlay').classList.add('active');
  setupPasswordVisibilityToggle();
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  let passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.type = "password";
  }
}

function setupPasswordVisibilityToggle() {
  let eyeCheckbox = document.getElementById('eye');
  if (!eyeCheckbox) return;

  let passwordInput = eyeCheckbox.closest('#passwordHolder').querySelector('input[type="password"]');

  eyeCheckbox.addEventListener('change', function () {
    if (eyeCheckbox.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
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
  const user = localStorage.getItem("user");
  return user !== null && user !== ""; // Kontrollerar att det finns ett giltigt värde, inte bara null
}

// Login User and set user object to localStorage
async function loginUser(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter both username and password");
    return;
  }

  let user = {
    entity: "login",
    row: { username: username, password: password }
  };

  try {
    const loginUserObject = await State.POST(user);
    // Check if there's an error in the response
    if (loginUserObject.error) {
      console.error("Error logging in", loginUserObject.error);
      alert("Wrong username or password, try again");
      return;
    }

    localStorage.setItem("user", loginUserObject.user_id);
    localStorage.setItem("username", loginUserObject.username);
    closeModal(document.getElementById("loginModal"));
    // renderRedirectUserPage("mainPage", loginUserObject);
    window[localStorage.getItem("loadedPage")](...JSON.parse(localStorage.getItem("loadedPage-argumet")));
    updateLoginLogoutButton();
    window.location.replace('index.html');
    console.log("Login successful");
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
      console.log("User registered successfully", registerUserObject);
      // Ändra modalens innehåll till login och öppna den
      changeModalContent(document.getElementById("loginModal"), "logInButton");
      openModal(document.getElementById("loginModal"));
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
  localStorage.removeItem("username");
  updateLoginLogoutButton();
  console.log("Logout successful");

  window.location.replace('index.html'); // Go to main'index.html' 
}






