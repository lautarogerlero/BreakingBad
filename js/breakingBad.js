const container = document.querySelector(".containerSeccion");
const containerPersonaje = document.querySelector(".containerPersonaje");
const infoPersonaje = document.querySelector(".infoPersonaje");
const buttonBack = document.querySelector("#buttonBack");

const apiBB = "https://www.breakingbadapi.com";

const obtenerResultado = () => {
    fetch(apiBB + "/api/characters?category=Breaking+Bad")
    .then(response => response.json())
    .then(data => {
        container.innerHTML = cargarPersonajes(data);
        clickPersonaje();
    })
    .catch((error) => console.log(error))
}

obtenerResultado()

const cargarPersonajes = (array) => {
    const arrayReducido = array.reduce((acc, curr) => {
        return acc + `
            <div class="personaje" id=${curr.char_id}>
                <img src=${curr.img} alt=${curr.name}>
                <div class="personajeDatos">
                    <h4>${curr.name}</h4>
                    <button>View More</button>
                </div>
            </div>
            `
    }, "")
    
    return arrayReducido
}

const clickPersonaje = () => {
    const personajes = document.getElementsByClassName("personaje");
    
    for(let i = 0; i < personajes.length; i++){
        personajes[i].onclick = () => {
            const id = personajes[i].id;
            obtenerInfoPersonaje(id);
        }
    }
}

const obtenerInfoPersonaje = async (id) => {
    const response = await fetch(apiBB + "/api/characters/" + id);
    const data = await response.json();
    infoPersonaje.innerHTML = mostrarPersonaje(data[0]);
}

const mostrarPersonaje = (data) => {
    container.style.display = "none";
    containerPersonaje.style.display = "flex";
    buttonBack.onclick = () => {
        container.style.display = "flex";
    containerPersonaje.style.display = "none";
    }

    return `
        <article class="personajeSolo">
            <div class="containerImg">
                <img src=${data.img} alt=${data.name}>
            </div>
            <div class="containerPersonajeInfo">
                <h3>
                    Name: ${data.name}
                </h3>
                <h3>
                    Nickname: ${data.nickname}
                </h3>
                <h3>
                    Occupation: ${data.occupation}
                </h3>
                <h3>
                    Status: ${data.status}
                </h3>
            </div>
        </article>
    `
}








