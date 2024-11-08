const requestURL = "https://dragonball-api.com/api/characters?limit=9999";

async function fetchCharactersJson(){
    try{
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Error en la peticion ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error(`Error al obtener los Personajes de la API : `,error);
        return null;
    }
}

function createCharacterCard ({name, image, ki, maxKi, race, gender, affiliation}){
    return `<div class="card-group cardGroup">
                <div class="card" id='allCards'>
                    <img src="${image}" class="card-img-top cardImgTop" alt="" id='allCards'>
                    <div class="card-body cardBody" id='allCards'>
                        <h5 class="card-title cardTitle" id='allCards'>${name}</h5>
                        <h6 class="card-text cardText" id='allCards'>${race}- ${gender} </h6>
                        <h6 class="card-text cardText" id='allCards'>ki: ${ki}</h6>
                        <h6 class="card-text cardText" id='allCards'>Max Ki: ${maxKi}</h6>
                        <h6 class="card-text cardText" id='allCards'>Afiliación: ${affiliation}</h6>
                    </div>
                </div>
            </div>
    `;
}

async function displayCharacters() {
    const characters = document.getElementById('characterSection');
    const charactersData = await fetchCharactersJson();

    if (charactersData && charactersData.items){
        const characterCards = charactersData.items.map(createCharacterCard).join('');
        characters.innerHTML = characterCards;
    }
    else{
        characters.innerHTML = `<p>No se ha podido cargar el Json de los Personajes</p>`
    }
}
displayCharacters();