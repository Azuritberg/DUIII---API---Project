"use strict"; 

function renderLogin () {
    const mainContainer = document.getElementById("wrapper");

    mainContainer.innerHTML = '';

    const loginContainer = document.createElement("div");
    loginContainer.id = "container-login";
    loginContainer.innerHTML = `<h2>Login</h2>`;
  
    const usernameContainer = document.createElement("div");
    usernameContainer.className = "card";
    usernameContainer.innerHTML = `
    <label for="input-username">Username</label>
    <input type="text" name="input-username">
    `;
  
    const passwordContainer = document.createElement("div");
    passwordContainer.className = "card";
    passwordContainer.innerHTML = `
    <label for="input-password">Password</label>
    <input type="password" name="input-password">
    `;
  
    const loginButton = document.createElement("button");
    loginButton.textContent = "Login";
    loginButton.addEventListener('click', () => {
        const username = usernameContainer.querySelector("input").value;
        const password = passwordContainer.querySelector("input").value;
        loginUser(username, password);
    });

    const signUpButton = document.createElement("button");
    signUpButton.textContent = "Sign up";
    signUpButton.addEventListener('click', () => {
        window.location.replace(`${window.location.origin}/register`);
    });

    loginContainer.appendChild(usernameContainer);
    loginContainer.appendChild(passwordContainer);
    loginContainer.appendChild(loginButton);
    loginContainer.appendChild(signUpButton);
    mainContainer.appendChild(loginContainer);
}




