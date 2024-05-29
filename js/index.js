const API_URL = "http://localhost:8080/ranking";

console.log("hola mundo")


document.addEventListener("DOMContentLoaded",function(){

    fetch(API_URL)
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => mostrarRanking(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores


    contador = 0;

    let btn = document.getElementById("registrarse")
    btn.addEventListener("click",function(){
        alert("Se redirige a Register.html!")
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


            li.appendChild(div);
            li.appendChild(h3);

            rankingList.appendChild(li);
        });

    }

   

}) 