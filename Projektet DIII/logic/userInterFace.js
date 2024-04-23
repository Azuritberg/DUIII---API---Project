"use strict";


// LOGIN & REGISTER

async function loginUser(username, password) {
    const data = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: username,
            password: password
        })
    }
    const request = new Request("/api/login.php", data);

    try {
        const result = await fetcher(request);
        if (result.ok && result.data.token) {
            localStorage.setItem("token", result.data.token);
            console.log("Login successful", result.data);
            window.location.replace(`${window.location.origin}`);
        } else {
            alert("Invalid username or password")
            console.error("Error logging in", result.error);
        }
    } catch (error) {
        console.error("Error logging in", error);
    }
}

async function registerUser(username, password) {
    const data = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: username, 
            password: password
        })
    }
    const request = new Request("/api/users.php", data);

    try {
        const result = await fetcher(request);
        if (result.ok) {
            console.log("User registered successfully", result);
            window.location.replace(`${window.location.origin}/login`);
        } else {
            console.error("Error registering user", result.error);
        }
    } catch (error) {
        console.error("Error registering user", error);
    }
}