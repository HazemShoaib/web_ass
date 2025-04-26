import { addUser , getUsers} from './storage.js';
const signUpForm = document.getElementById("signUpForm");
const usertable = [];
const message = document.getElementById('messageArea');

signUpForm.addEventListener('submit', registerUser);

function registerUser(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const useremail = document.getElementById('userEmail').value;
    const password = document.getElementById('password').value;
    const Cpassword = document.getElementById('Cpassword').value;
    const role = document.getElementById('role').value;

    if (username === "" || useremail === "" || password === "" || Cpassword === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "	#ff0000";
        console.log('empty field');
        setTimeout ( function (){ message.textContent = ""; message.style.color = "#000000";}, 5000 );
        return;
    }
    if (password !== Cpassword) {
        message.textContent = "Passwords do not match.";
        message.style.color = "	#ff0000";
        console.log('wrong password validation');
        setTimeout ( function (){ message.textContent = ""; message.style.color = "#000000";}, 5000 );
        return;
    }
    if ((getUsers().some(u => u.username === username))){
        message.textContent = "Username already exists.";
        message.style.color = "	#ff0000";
        console.log('username already exists')
        setTimeout ( function (){ message.textContent = ""; message.style.color = "#000000";}, 5000 );
        return;
    }
    if ((getUsers().some(u => u.useremail === useremail))){
        message.textContent = "email is already registered";
        message.style.color = "	#ff0000";
        console.log('email is already registered')
        setTimeout ( function (){ message.textContent = ""; message.style.color = "#000000";}, 5000 );
        return;
    }
    if (password.length < 8){
        message.textContent = "password should atleast be 8 letters long"
        message.style.color = "	#ff0000";
        console.log('password too short')
        setTimeout ( function (){ message.textContent = ""; message.style.color = "#000000";}, 5000 );
        return;
    }

    const user = {username: username , email: useremail , password: password , role: role}
    addUser(user);
    //window.localStorage.setItem("username", username, role, useremail, password);
    console.log("user registered succeccfully");
    message.textContent = "Sign up successful!";
    message.style.color = "#008000";
    setTimeout ( function (){ message.textContent = ""; message.style.color = "#000000";}, 2999 );
    setTimeout ( function (){ window.location = "login.html"}, 3000 );
}