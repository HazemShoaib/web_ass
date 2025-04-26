import { getUser } from "./storage.js";
const message = document.getElementById('messageArea');

loginForm.addEventListener('submit', checkUser);

function checkUser (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = getUser(username);
    
    if (user && user.password === password) {
        console.log("Login successful");
    
        localStorage.setItem("current", JSON.stringify(user));
        message.textContent = "Login successful";
        message.style.color = "rgb(40, 202, 0)";
        setTimeout ( function (){message.textContent = ""; message.style.color = "000000";}, 2999);
        setTimeout ( function () { 
            if (user.role === "admin") {window.location = "admindash.html";}
            else {window.location = "user_dashboard.html";}}, 3000)

    } else {
        console.log("Invalid credentials");
        message.textContent = "Invalid credentials";
        message.style.color = "rgb(255, 0, 0)";
        setTimeout ( function (){message.textContent = ""; message.style.color = "000000";}, 5000);
        return;
    }
}