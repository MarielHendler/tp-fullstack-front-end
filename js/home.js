document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    console.log('Token guardado:', token);
    const mensajeDiv = document.getElementById('mensaje');
    const contenidoDiv = document.getElementById('contenido');
    const btnLogin = document.getElementById('btnLogin');

    if (token == null) {
        mensajeDiv.textContent = 'No estás autenticado. Por favor, inicia sesión.';
        mensajeDiv.style.color = 'red';
        btnLogin.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/usuario/peluches', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const peluches = await response.json();
            console.log(peluches);
            peluches.forEach(peluche => {
                console.log(peluche.tipo);
                const li = document.createElement('li');
                li.textContent = peluche.tipo; 
                peluchesList.appendChild(li);
            });
            contenidoDiv.style.display = 'block';
        } else {
            console.log("entro al else");
            const errorText = await response.text();
            mensajeDiv.textContent = 'Error al cargar los peluches: ' + errorText;
            mensajeDiv.style.color = 'red';
            localStorage.removeItem('token');
            btnLogin.style.display = 'block';
            btnLogin.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    } catch (error) {
        console.log("entro al catch");
        console.log(error);
        mensajeDiv.textContent = 'Error al verificar la autenticación. Por favor, inicia sesión.';
        mensajeDiv.style.color = 'red';
        localStorage.removeItem('token');
        btnLogin.style.display = 'block';
        btnLogin.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
});
