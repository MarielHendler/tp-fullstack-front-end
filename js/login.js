document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            email: email,
            password: password
        };

        console.log(data);
        const mensajeDiv = document.getElementById('mensaje');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            if (response.ok) {
                const result = await response.json();
                const token = result;
                localStorage.setItem('token', token);
                window.location.href = 'home.html';
            } else {
                const errorData = await response.text();
                console.log(errorData);
                mensajeDiv.textContent = errorData;
                mensajeDiv.style.color = 'red';
            }
        } catch (error) {
            console.log(error);
            mensajeDiv.textContent = error.message;
            mensajeDiv.style.color = 'red';
        }
    });
});