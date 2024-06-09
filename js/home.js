const API_URL = "http://localhost:8080/usuario/peluches";

document.addEventListener('DOMContentLoaded', async function () {
    const logoutButton = document.getElementById('logout');
    const mensajeDiv = document.getElementById('mensaje');
    const authContent = document.getElementById('auth-content');
    const peluchesList = document.getElementById('peluchesusuario');
    const NavButtons = document.getElementById('navdiv');

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

    try {
        const response = await fetch(API_URL, {
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
                const li = document.createElement('li');

                // Crear y agregar texto del tipo de peluche
                const tipoText = document.createElement('p');
                tipoText.textContent = ` ${peluche.tipo} ${peluche.color} `;
                li.appendChild(tipoText);

                // Crear y agregar texto del accesorio de peluche
                const accesorioText = document.createElement('p');
                accesorioText.textContent = `con ${peluche.accesorio}`;
                li.appendChild(accesorioText);

                // Obtener la imagen del peluche
                let imgSrc = getImagen(peluche.tipo, peluche.color);
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = peluche.tipo;
                console.log(img.alt);
                img.style.width = '100px';
                li.appendChild(img);

                // Crear botón eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar Peluche';
                btnEliminar.style.color = 'red';

                btnEliminar.addEventListener('click', function () {
                    const confirmacion = confirm('¿Está seguro de querer eliminar su peluche?');
                    if (confirmacion) {
                        deletePeluche(peluche._id);
                    }
                });

                li.appendChild(btnEliminar);

                peluchesList.appendChild(li);
            });
        } else {
            console.log("entro al else");
            const errorText = await response.text();
            mensajeDiv.textContent = 'Error al cargar los peluches: ' + errorText;
            mensajeDiv.style.color = 'red';
            mensajeDiv.style.textAlign = 'center';
            mensajeDiv.style.padding = '20px';

            authContent.style.display = 'none'; //no muestro mi contenido
            NavButtons.style.display = 'none'; //no muestro la botonera de home

            localStorage.removeItem('token');
            btnLogin.style.display = 'block';

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
    } catch (error) {
        console.log("entro al catch");
        console.log(error);
        mensajeDiv.textContent = 'Ha ocurrido un error inesperado.';
        mensajeDiv.style.color = 'red';
        return;
    }

    function getImagen(tipo, color) {
        const ruta = "images\\";

        let nombre = "";

        switch (tipo.toLowerCase()) {
            case "gato":
                nombre = "gato";
                break;
            case "mapache":
                nombre = "mapache";
                break;
            case "perro":
                nombre = "perro";
                break;
            default:
                nombre = "default";
                break;
        }

        switch (color.toLowerCase()) {
            case "rosa":
                nombre += "rosa.jpg";
                break;
            case "verde":
                nombre += "verde.jpg";
                break;
            case "amarillo":
                nombre += "amarillo.jpg";
                break;
            // Añadir más casos según los colores disponibles
            default:
                nombre += "default.jpg";
                break;
        }

        const rutaimagen = ruta + nombre;
        return rutaimagen;
    }

    async function deletePeluche(pelucheId) {
        try {
            const response = await fetch(`${API_URL}/${pelucheId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                mensajeDiv.textContent = 'Peluche eliminado correctamente';
                mensajeDiv.style.color = 'green';
                window.location.href = 'home.html';
                console.log('Peluche eliminado con éxito');
            } else {
                mensajeDiv.textContent = 'Error al eliminar el peluche';
                mensajeDiv.style.color = 'red';
                console.error('Error al eliminar el peluche');
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
        }
    }
}); 