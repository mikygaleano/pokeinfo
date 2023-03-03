const Poke_Api = 'https://pokeapi.co/api/v2/';
const conteinerPokedex = document.querySelector('.conteiner-pokedex');
const next = document.querySelector('.next');
const previe = document.querySelector('.previe');
const btnBuscar = document.getElementById('buscar');
const formBuscar = document.getElementById('formBuscar');
let limite = 19;
let offSet = 1;


async function GetFetchPokedex (id)  {
    const responsi = await fetch(`${Poke_Api}pokemon/${id}`);
    const datos = await responsi.json();
    console.log(datos)
    const respcolor = await fetch(`${Poke_Api}pokemon-species/${id}`);
    const datosColor = await respcolor.json();
    const array = [datos, datosColor];
    return [array]; 
};
    
async function pokemonId (limite, offSet) {
    for ( i = offSet; i <= offSet + limite; i++) {
        const datos = await GetFetchPokedex(i);
        
        datos.map(element => {
            createCardsPokemons(element);
        });
    }
};


function btnPrevie () {
    previe.addEventListener('click', ()=> {
        conteinerPokedex.textContent = ''
        if (offSet != 1) {
            offSet -= 20;
        } 
        return pokemonId(limite, offSet);
    });
};
function btnNext () {
    next.addEventListener('click', ()=> {
        conteinerPokedex.textContent = ''
        offSet += 20;
        return pokemonId(limite, offSet);
    });
    buscarPokemon()
}

async function buscarPokemon() {
    formBuscar.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    btnBuscar.addEventListener('change', async () => {
        const searchTerm = btnBuscar.value.trim().toLowerCase();
        const searchTerms = searchTerm.split(" ");
        conteinerPokedex.textContent = '';
        for (const term of searchTerms) {
            if (term) {
                const datos = await GetFetchPokedex(term);
                datos.map(element => {
                    createCardsPokemons(element);
                });  
            }
            if (term === '') {
                pokemonId(limite, offSet);
            }    
        }
    });
  }

function createCardsPokemons (datos) {



    const conteinerCards = document.createElement('div');
    conteinerCards.classList.add('conteinerCards')
    const conteinerInfo = document.createElement('div');
    const figureCard = document.createElement('figure');
    const imgCard = document.createElement('img');
    const name = document.createElement('h5');
    name.classList.add('nameCards')
    const number = document.createElement('h3');
    number.classList.add('number')
    const type = document.createElement('p');
    type.classList.add('type')
    
    name.textContent = datos[0].name;
    type.textContent = datos[0].types[0].type.name;
    conteinerInfo.append(name, type);


    imgCard.setAttribute('src', datos[0].sprites.other['official-artwork'].front_default);
    imgCard.setAttribute('alt', datos[0].name);
    figureCard.appendChild(imgCard);

    number.textContent = `#${datos[0].order.toString().padStart(3, 0)}`;

    conteinerCards.append(number, figureCard, conteinerInfo)

    conteinerPokedex.appendChild(conteinerCards);

    
    conteinerCards.style.backgroundColor = datos[1].color.name;
    

};



document.addEventListener('DOMContentLoaded', ()=> {
    pokemonId(limite, offSet);
    btnPrevie();
    btnNext();
})

