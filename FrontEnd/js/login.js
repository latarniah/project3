
//TODO integrate login page
// fetch("http://localhost:5678/api/users/login", {


async function login(emailAddress, password) {
    try {
        const response = await fetch('("http://localhost:5678/api/users/login"', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailAddress, password })
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