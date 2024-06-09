const API_URL_PELUCHES = "http://localhost:8080/peluches";
const API_URL_COLORES = "http://localhost:8080/colores";
const API_URL_ACCESORIOS = "http://localhost:8080/accesorios";

document.addEventListener('DOMContentLoaded', async function () {
    const tipoPeluche = document.getElementById('tipo');
    const colorPeluche = document.getElementById('color');
    const accesorioPeluche = document.getElementById('accesorio');
    const authContent = document.getElementById('auth-content');
    const logoutButton = document.getElementById('logout');
    const NavButtons = document.getElementById('navdiv');
    const mensajeDiv = document.getElementById('mensaje');

    //cerrar sesión
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('token');
        window.location.href = './index.html';
    });


    const token = localStorage.getItem('token');
    console.log('Token guardado:', token);
    
    if (token == null) {
        mensajeDiv.textContent = 'No estás autenticado. Por favor, iniciá sesión.';
        mensajeDiv.style.color = 'red';
        mensajeDiv.style.textAlign = 'center';
        mensajeDiv.style.padding = '20px';

        authContent.style.display = 'none'; //no muestro mi contenido
        NavButtons.style.display = 'none'; //no muestro la botonera de home

        const btnLogin = document.createElement('button');
        btnLogin.textContent = 'Inicia sesión aquí';
        btnLogin.style.display = 'block';
        btnLogin.style.margin = '10px auto';
        btnLogin.style.fontSize = '16px';
        btnLogin.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
        mensajeDiv.appendChild(btnLogin);
        return;
    }

    async function fetchOpciones() {
        try {
            // Fetch tipos
            let response = await fetch(API_URL_PELUCHES);
            let tipos = await response.json();
            tipos.forEach(tipo => {
                let option = document.createElement('option');
                option.value = tipo.id;
                option.textContent = tipo.nombre;
                tipoPeluche.appendChild(option);
            });

            // Fetch colores
            response = await fetch(API_URL_COLORES);
            let colores = await response.json();
            colores.forEach(color => {
                let option = document.createElement('option');
                option.value = color.id;
                option.textContent = color.nombre;
                colorPeluche.appendChild(option);
            });

            // Fetch accesorios
            response = await fetch(API_URL_ACCESORIOS);
            let accesorios = await response.json();
            accesorios.forEach(accesorio => {
                let option = document.createElement('option');
                option.value = accesorio.id;
                option.textContent = accesorio.nombre;
                accesorioPeluche.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    }

    fetchOpciones();

    const form = document.getElementById('customize-form');

    /*form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const tipo = document.getElementById('tipo').value;
        const color = document.getElementById('color').value;
        const accesorio = document.getElementById('accesorio').value;

        console.log('Tipo:', tipo);
        console.log('Color:', color);
        console.log('Accesorio:', accesorio);

        // Aquí puedes añadir la lógica para enviar estos datos a tu servidor o API.
    });*/
   
}); 