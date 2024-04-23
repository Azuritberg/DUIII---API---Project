"use strict"; 

function renderRegister () {
    const mainContainer = document.getElementById("wrapper");

    mainContainer.innerHTML = ``;

    const registerContainer = document.createElement("div");
    registerContainer.id = "container-register";
    registerContainer.innerHTML = `<h2>Sign up</h2>`;
  
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
  
    const registerButton = document.createElement("button");
    registerButton.textContent = "Register";
    registerButton.addEventListener('click', () => {
        const username = usernameContainer.querySelector("input").value;
        const password = passwordContainer.querySelector("input").value;
        registerUser(username, password);
    });

    const signUpButton = document.createElement("button");
    signUpButton.textContent = "Login";
    signUpButton.addEventListener('click', () => {
        //renderRegister();
        window.location.replace(`${window.location.origin}/login`);
    });

    registerContainer.appendChild(usernameContainer);
    registerContainer.appendChild(passwordContainer);
    registerContainer.appendChild(registerButton);
    registerContainer.appendChild(signUpButton);
    mainContainer.appendChild(registerContainer);
}





