

// Create a function in script.js that returns true if the user's token is found in local storage 
// and false if not. This will be useful to determine if elements on the home page should be shown
//  or hidden depending on if the user is logged in.
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== undefined && token !== null;

}
console.log(isLoggedIn())
if (isLoggedIn()) {
    //TODO show black edit bar
    //TODO show edit button next to my project
    //TODO hidde category filters
    // const filters = document.querySelector(".filters");
    // const topNav = document.querySelector(".topNav")
    // const edit = document.querySelector(".edit");
    //     edit.classList.remove('hidden'); // Show the edit bar

    //     topNav.classList.remove('hidden'); // Show the top navigation bar

    //     filters.classList.add('hidden'); // Hide the category filters
}
