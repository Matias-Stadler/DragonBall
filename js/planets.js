const requestURL = "https://dragonball-api.com/api/planets?limit=9999";

async function fetchPlanetsJson(){
    try{
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Error en la peticion ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error(`Error al obtener los Planetas de la API : `,error);
        return null;
    }
}

function createPlanetsCard ({name, image, description}){
    return `<div class="card-group cardGroup">
                <div class="card" id='allCards'>
                    <img src="${image}" class="card-img-top cardImgTop" alt="" id='allCards'>
                    <div class="card-body cardBody" id='allCards'>
                        <h5 class="card-title cardTitle" id='allCards'>${name}</h5>
                        <p class="card-text cardText"><small class="text-muted" id='descriptionCards'>${description}</small></p>
                    </div>
                </div>
            </div>
    `;
}

async function displayPlanets() {
    const planets = document.getElementById('planetsSection');
    const planetsData = await fetchPlanetsJson();

    if (planetsData && planetsData.items){
        const planetCards = planetsData.items.map(createPlanetsCard).join('');
        planets.innerHTML = planetCards;
    }
    else{
        planets.innerHTML = `<p>No se ha podido cargar el Json de los Planetas</p>`
    }
}
displayPlanets();