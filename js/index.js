const API_URL = "http://localhost:8080/ranking";

document.addEventListener("DOMContentLoaded",function(){

    fetch(API_URL)
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => mostrarRanking(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores



    let btn = document.getElementById("registrarse")
    btn.addEventListener("click",function(){
    })
   

    function mostrarRanking(json){
        console.log(json);
        let rankingList = document.getElementById("rankingpeluche");

        json.forEach((element,index) => {

            let li = document.createElement("li");
            li.setAttribute("id",index+1);

            div = document.createElement("div");

            let h3 = document.createElement("h3")

            let texto = (index+1) + ". " +  
                        element.pelucheUsuarioRanking.tipo + " "
                      + element.pelucheUsuarioRanking.color + " con "
                      + element.pelucheUsuarioRanking.accesorio

            nodo = document.createTextNode(texto)
            h3.appendChild(nodo)

           /* let img = document.createElement("img");
            img.src = getImage(element.pelucheUsuarioRanking.color);
            img.alt = element.pelucheUsuarioRanking.tipo + " " + element.pelucheUsuarioRanking.color;
*/
            li.appendChild(div);
          //  li.appendChild(img);
            li.appendChild(h3);

            rankingList.appendChild(li);
        });

    }

  /*  function getImage(tipo, color) {
        const basePath = "images/";
        let fileName = "";

        switch(tipo.toLowerCase()) {
            case "gato":
                fileName = "gato";
                break;
            case "mapache":
                fileName = "mapache";
                break;
             case "perro":
                fileName = "perro";
                break;  
        }

        switch(color.toLowerCase()) {
            case "rosa":
                fileName += "rosa.jpg";
                break;
            case "verde":
                fileName += "verde.jpg";
                break;
            case "amarillo":
                fileName += "amarillo.jpg";
                break;
            // Añadir más casos según los colores disponibles
  
        }
        
        return basePath + fileName;
    }*/
});