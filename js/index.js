const API_URL = "http://localhost:8080/ranking";

document.addEventListener("DOMContentLoaded", function () {

    fetch(API_URL)
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => mostrarRanking(json))    //imprimir los datos en la consola
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

    function mostrarRanking(json) {
        console.log(json);
        let rankingList = document.getElementById("rankingpeluche");

        json.forEach((element, index) => {

            let li = document.createElement("li");
            li.setAttribute("id", index + 1);

            div = document.createElement("div");

            let h3 = document.createElement("h3")

            let texto = `${index + 1}. ${element.pelucheUsuarioRanking.tipo} ${element.pelucheUsuarioRanking.color} con ${element.pelucheUsuarioRanking.accesorio} - Vendidos: ${element.cantidad}`;
            nodo = document.createTextNode(texto)
            h3.appendChild(nodo)

            let img = document.createElement("img");
            img.src = getImagen(element.pelucheUsuarioRanking.tipo, element.pelucheUsuarioRanking.color);
            img.classList.add("imagenespeluches")

            li.appendChild(div);
            li.appendChild(img);
            li.appendChild(h3);

            rankingList.appendChild(li);
        });

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
});