
//TODO integrate login page
// fetch("http://localhost:5678/api/users/login", {

//TODO add click event listener to submit button wich call the function below
async function login(email, password) {
    // FIXME get email and pass from input field bc its going coming as paramaters
    try {
        const response = await fetch('("http://localhost:5678/api/users/login"', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {

            const data = await response.json();

            console.log('Login successful:', data);
        } else {

            console.error('Login failed:', response.status);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}