const users = [];
const books = [];
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("books", JSON.stringify(books));

/*
every row in users is an object, example of users :
const users = [
    {username: "dummyusername1" , email: "dummyemail1" , password: "dummypassword1" , role: admin}
    {username: "dummyusername2" , email: "dummyemail2" , password: "dummypassword2" , role: user}
]
*/


function addUser(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const borrowed = [];
    localStorage.setItem(user.username, JSON.stringify(borrowed));
    console.log("retreived users: ", users);


    users.push(user);
    console.log("added user successfully ", users);
    localStorage.setItem("users", JSON.stringify(users));
}

function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("retreived users: ", users);

    const filteredusers = users.filter(user => user.username !== username);
    
    if (filteredusers.length === users.length) {
        console.log("failed to delete user: username " , username , " not found");
        return;
    }
    localStorage.removeItem(username);

    console.log("deleted user successfully ", users);
    localStorage.setItem("users", JSON.stringify(filteredusers));
}

function getUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("retreived users: ", users);

    return users;
}

function getUser(username) {
    const users = getUsers();

    const fuser = users.filter(user => user.username === username);
    
    if(fuser) {
        console.log("retreived user: ", fuser);
        return fuser;
    }
    console.log("failed to retreive ", username);
}

// function addBorrowed(username, book) {
//     const borrowed = JSON.parse(localStorage.getItem(username)) || [];
//     console.log("retreived borrowed books: ", borrowed);

//     borrowed.push(book);
//     console.log("added borrowed successfully ", borrowed);
//     localStorage.setItem(username, JSON.stringify(borrowed));
// }

// function removeBorrowed(username, book) {
//     let borrowed = JSON.parse(localStorage.getItem(username)) || [];
//     console.log("retreived borrowed books: ", borrowed);

//     const filteredBorrowed = borrowed.filter( (b) => b !== book );

//     if (filteredBorrowed.length === borrowed.length){
//         console.log("failed to delete ", book, " from ", username, " borrowed");
//         return;
//     }

//     console.log("deleted borrowed successfully ", borrowed);
//     localStorage.setItem(username, JSON.stringify(filteredBorrowed));
// }

// function getBorrowed(username) {
//     const borrowed = JSON.parse(localStorage.getItem(username)) || [];
//     console.log("retreived borrowed books: ", borrowed);

//     return borrowed;
// }