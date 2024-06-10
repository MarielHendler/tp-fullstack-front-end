const API_URL_PELUCHES = "http://localhost:8080/peluches";
const API_URL_COLORES = "http://localhost:8080/colores";
const API_URL_ACCESORIOS = "http://localhost:8080/accesorios";
const API_URL_ASOCIARPELUCHEUSUAURIO = "http://localhost:8080/usuario/peluches";

document.addEventListener('DOMContentLoaded', async function () {
    const tipoPeluche = document.getElementById('tipo');
    const colorPeluche = document.getElementById('color');
    const accesorioPeluche = document.getElementById('accesorio');
    const authContent = document.getElementById('auth-content');
    const logoutButton = document.getElementById('logout');
    const NavButtons = document.getElementById('navdiv');
    const mensajeDiv = document.getElementById('mensaje');
    const imagenDiv = document.getElementById('imagen-peluche');

    // cerrar sesión
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('token');
        window.location.href = './index.html';
    });

    const token = localStorage.getItem('token');
    console.log('Token guardado:', token);

    // Reviso primero que se haya autenticado el usuario
    if (token == null) {
        mensajeDiv.textContent = 'No estás autenticado. Por favor, iniciá sesión.';
        mensajeDiv.style.color = 'red';
        mensajeDiv.style.textAlign = 'center';
        mensajeDiv.style.padding = '0px';

        authContent.style.display = 'none'; // no muestro mi contenido
        NavButtons.style.display = 'none'; // no muestro la botonera de home

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
        // Fetch tipo peluche
        fetch(API_URL_PELUCHES)
            .then(response => response.json())
            .then(data => {
                data.forEach(peluche => {
                    var option = document.createElement("option");
                    option.value = peluche.tipo;
                    option.text = peluche.tipo;
                    tipoPeluche.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching tipo de peluche:', error);
            });

        // Fetch colores
        fetch(API_URL_COLORES)
            .then(response => response.json())
            .then(data => {
                data.forEach(color => {
                    var option = document.createElement("option");
                    option.value = color.colorpeluche;
                    option.text = color.colorpeluche;
                    colorPeluche.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching colores:', error);
            });

        // Fetch accesorios
        fetch(API_URL_ACCESORIOS)
            .then(response => response.json())
            .then(data => {
                data.forEach(accesorio => {
                    var option = document.createElement("option");
                    option.value = accesorio.estilo;
                    option.text = accesorio.estilo;
                    accesorioPeluche.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching accesorios:', error);
            });
    } catch (error) {
        console.error('Error', error);
    }

    const form = document.getElementById('personalizado-peluche');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const tipo = tipoPeluche.value;
        const color = colorPeluche.value;
        const accesorio = accesorioPeluche.value;

        if (!tipo || !color || !accesorio) {
            alert('Por favor, complete todos los campos para personalizar su peluche.');
            return;
        }

        const confirmacion = confirm(`¿Está seguro de generar un ${tipo} ${color} con ${accesorio}?`);
        if (confirmacion) {
            try {
                const response = await fetch(API_URL_ASOCIARPELUCHEUSUAURIO, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tipo,
                        color,
                        accesorio
                    })
                });

                if (response.ok) {
                    console.log(response);
                    mensajeDiv.textContent = 'Se generó su peluche personalizado';
                    mensajeDiv.style.color = 'green';
                    mensajeDiv.style.textAlign = 'center';
                    mensajeDiv.style.padding = '20px';
                } else {
                    const errorText = await response.text();
                    mensajeDiv.textContent = 'Error al personalizar el peluche: ' + errorText;
                    mensajeDiv.style.color = 'red';
                }
            } catch (error) {
                console.error('Error', error);
                mensajeDiv.textContent = 'Ha ocurrido un error inesperado.';
                mensajeDiv.style.color = 'red';
            }
        }
    });

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
    
    // Función para mostrar la imagen del peluche según el tipo y color seleccionado
    function mostrarImagen() {
        const tipo = tipoPeluche.value;
        const color = colorPeluche.value;
    
        // Verificar si se ha seleccionado tanto el tipo como el color
        if (tipo && color) {
            // Obtener ruta de la imagen del peluche
            const imgSrc = getImagen(tipo, color);
    
            console.log(imgSrc);
            // Mostrar la imagen
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${tipo} ${color}`;
            img.style.width = '200px'; // Establecer tamaño de la imagen
    
            // Limpiar el contenido anterior antes de agregar la nueva imagen
            imagenDiv.innerHTML = '';
    
            // Agregar imagen al mensajeDiv
            imagenDiv.appendChild(img);
        } else {
            // Si no se ha seleccionado tanto el tipo como el color, eliminar la imagen
            imagenDiv.innerHTML = '';
        }
    }
    
    tipoPeluche.addEventListener('change', mostrarImagen);
    colorPeluche.addEventListener('change', mostrarImagen);

});