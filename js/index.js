const API_URL = "http://localhost:8080/ranking";

console.log("hola mundo")


document.addEventListener("DOMContentLoaded",function(){

    fetch(API_URL)
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => mostrarDatos(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores


    contador = 0;

    let btn = document.getElementById("registrarse")
    btn.addEventListener("click",function(){
        alert("Se redirige a Register.html!")
    })
   
    function mostrarDatos(json){
        console.log(json)
    }    

   

}) 