const containerWalter = document.querySelector(".containerWalter");
const containerSaul = document.querySelector(".containerSaul")

const url = "../secciones/breakinBad.html"

const apiBB = "https://www.breakingbadapi.com";
const apiWalter = apiBB + "/api/characters?name=Walter+White";
const apiSaul = apiBB + "/api/characters?name=Saul+Goodman";

const obtenerPersonaje = async (api, container) => {
    const response = await fetch(api);
    const data = await response.json();
    container.innerHTML = mostrarPersonaje(data[0]);
    console.log(data[0].char_id)
    clickEnBoton();
}

const mostrarPersonaje = (data) => {
    let serie;
    if(data.name === "Walter White"){
        serie = "Breaking Bad"
    }
    else {
        serie = "Better Call Saul"
    }
    return `
    <article class="personajeHome">
        <img src=${data.img} alt=${data.name}>
        <button class="botonVerSerie" id="${data.char_id}">${serie}</button>
        </article>
`
}

obtenerPersonaje(apiWalter, containerWalter);
obtenerPersonaje(apiSaul, containerSaul);

const clickEnBoton = () => {
    const botones = document.getElementsByClassName("botonVerSerie");
    for (let i = 0; i < botones.length; i++){
        botones[i].onclick = () => {
            const idBoton = botones[i].getAttribute("id");
            if (idBoton === "1"){
                window.location.href = "./secciones/breakingBad.html"
            }
            else if (idBoton === "8"){
                window.location.href = "./secciones/betterCallSaul.html"
            }
        }
    }
}

const randomButton = document.getElementById("randomButton");
randomButton.onclick = () => {
    obtenerRandom();
    randomButton.innerText = "Another One"
}

const obtenerRandom = async () => {
    const containerRandom = document.querySelector(".containerRandom");
    const response = await fetch(apiBB + "/api/random-death");
    const data = await response.json();
    containerRandom.innerHTML = mostrarRandom(data)

}

const mostrarRandom = (data) => {
    return `
        <div class="ladoIzq">
            <h3>${data.death}</h3>
            <img src=${data.img} alt=${data.death}>
        </div>
        <div class="ladoDer">
            <h4>Cause of death:</h4>
            <p>${data.cause}</p>
            <h4>Responsible:</h4>
            <p>${data.responsible}</p>
            <h4>Last Words:</h4>
            <p>${data.last_words}</p>
        </div>
    `
}