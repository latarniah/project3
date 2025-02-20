localStorage.setItem('homeUrl', 'http://127.0.0.1:5500/FrontEnd/index.html');
const homeUrl = localStorage.getItem('homeUrl');

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submit = document.getElementById("submit");
// const handleLoginSuccess = document.getElementById("loginSucessful")

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

            // handleLoginSuccess()

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




// localStorage.setItem('homeUrl', 'http://127.0.0.1:5500/FrontEnd/index.html');
// const homeUrl = localStorage.getItem('homeUrl');

// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const submit = document.getElementById("submit");

// submit.addEventListener("click", function (event) {
//     event.preventDefault();

//     const email = emailInput.value;
//     const password = passwordInput.value;

//     console.log("Email:", email);
//     console.log("Password:", password);

//     login(email, password);
// });

// async function login(email, password) {
//     try {
//         const response = await fetch('http://localhost:5678/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await response.json();

//         if (data.token) {
//             localStorage.setItem("token", data.token);
//             console.log('Login successful:', data.token);

//             handleLoginSuccess();

            // Add a short delay before redirecting so UI updates can be seen
//             setTimeout(() => {
//                 window.location.href = homeUrl;
//             }, 500); // 500ms delay
//         } else {
//             console.error('Login failed:', response.status, data.message);
//             alert("Login failed: " + (data.message || "Please check your credentials."));
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         alert("An error occurred during login. Please try again.");
//     }
// }

// function handleLoginSuccess() {
//     console.log('Login successful, revealing elements.');

//        const hiddenElements = document.querySelectorAll('.hidden');

//     hiddenElements.forEach(element => {
//         console.log('Before:', element.innerHTML);

        
//         element.classList.remove('hidden');

//         console.log('After:', element.innerHTML);
//     });
// }
