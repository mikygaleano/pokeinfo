const Poke_Api = 'https://pokeapi.co/api/v2/';
const conteinerPokedex = document.querySelector('.conteiner-pokedex');
const next = document.querySelector('.next');
const previe = document.querySelector('.previe');
let number = 20;


async function GetFetchPokedex (id)  {
    const responsi = await fetch(`${Poke_Api}pokemon-form/${id}`);
    const datos = await responsi.json();
    const respcolor = await fetch(`${Poke_Api}pokemon-species/${id}`);
    const datosColor = await respcolor.json();
    const array = [datos, datosColor];
    return [array]; 
};
    
async function pokemonId (number) {
    for ( i = 1; i <= number; i++) {
        const datos = await GetFetchPokedex(i);
        
        datos.map(element => {
            console.log(element);
            createCardsPokemons(element);
        });
    }
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


    imgCard.setAttribute('src', datos[0].sprites['front_default']);
    imgCard.setAttribute('alt', datos[0].name);
    figureCard.appendChild(imgCard);

    number.textContent = `#${datos[0].order.toString().padStart(3, 0)}`;

    conteinerCards.append(number, figureCard, conteinerInfo)

    conteinerPokedex.appendChild(conteinerCards);

    
    conteinerCards.style.backgroundColor = datos[1].color.name;
    

};



document.addEventListener('DOMContentLoaded', ()=> {
    pokemonId(number);
    previe.addEventListener('click', ()=> {
        conteinerPokedex.textContent = ''
        if (number < !20) {
            number = number - 19;
        } 
        return pokemonId(number);
    });
    next.addEventListener('click', ()=> {
        conteinerPokedex.textContent = ''
        if (!number <= 1) {
            number = number + 19;
        } 
        return pokemonId(number);
    })
})

