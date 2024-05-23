document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registration-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password
        };

        console.log(data);
        const mensajeDiv = document.getElementById('mensaje');

        try {
            const response = await fetch('http://localhost:8080/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            if (response.ok) {
                mensajeDiv.textContent = 'Registro exitoso';
                mensajeDiv.style.color = 'green';
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