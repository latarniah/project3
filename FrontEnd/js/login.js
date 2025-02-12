// localStorage.setItem('homeUrl', 'http://127.0.0.1:5500/FrontEnd/index.html');
// const homeUrl = localStorage.getItem('homeUrl');

// const emailInput = document.getElementById("email")
// const passwordInput = document.getElementById("password")
// const submit = document.getElementById("submit")


// submit.addEventListener("click", function ($event) {
//     $event.preventDefault()
//     const email = emailInput.value
//     const password = passwordInput.value


//     console.log(email)
//     console.log(password)
//     login(email, password)

//     async function login(email, password) {

//         try {
//             const response = await fetch('http://localhost:5678/api/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },

//                 body: JSON.stringify({ email, password })
//             });



//             const data = await response.json();

//             if (data.token) {
//                 localStorage.setItem("token", data.token);
//                 console.log('Login successful:', data.token);
//             }
//             window.location.href = homeUrl;
            

//         } else {

//             console.error('Login failed:', response.status, data.message);
//             alert("Login failed: " + (data.message || "Please check your credentials."));

//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         alert("An error occurred during login. Please try again.");
//     }
// }
// })

            
// // Store the URL under a specific key (e.g., 'homeUrl')
// // localStorage.setItem('homeUrl', 'http://127.0.0.1:5500/FrontEnd/index.html');

// // Retrieve the stored URL from local storage
// // const homeUrl = localStorage.getItem('homeUrl');
// // console.log("Stored Home URL:", homeUrl);

// // Check if the homeUrl exists, then redirect the user
// // if (homeUrl) {
// //     window.location.href = homeUrl;
// // } else {
// // Optionally, provide a fallback URL if homeUrl is not set
// //     window.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html';
// // }


localStorage.setItem('homeUrl', 'http://127.0.0.1:5500/FrontEnd/index.html');
const homeUrl = localStorage.getItem('homeUrl');

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
    event.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Email:", email);
    console.log("Password:", password);

    
    login(email, password);
});

async function login(email, password) {
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

       
        if (data.token) {
            localStorage.setItem("token", data.token);
            console.log('Login successful:', data.token);
            
            window.location.href = homeUrl;
        } else {
            
            console.error('Login failed:', response.status, data.message);
            alert("Login failed: " + (data.message || "Please check your credentials."));
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert("An error occurred during login. Please try again.");
    }
}
