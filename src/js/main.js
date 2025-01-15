'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const listAnimes = document.querySelector('.js-list');

let animes = [];

function handleClickFav(event) {
    event.preventDefault();
    const animeClicked = event.currentTarget.id;
    //Me he quedado por aqui para hacer algo despues de pinchar en los lis. Tengo que hacer que se cambie la clase y se pongan en favoritos dentro de un array de favoritos. 
}

const listenerAnimeCards = () => {
    const allAnimes = document.querySelectorAll('.js-anime');
    for (const eachAnime of allAnimes) {
        eachAnime.addEventListener('click', handleClickFav);
    };
};


//Pintar la búsqueda

function renderAnimes(searchAnimes) {
    listAnimes.innerHTML = '';
    for (const anime of searchAnimes) {

        if(anime.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            listAnimes.innerHTML += 
                `<li id="${anime.mal_id}" class="animes js-anime">
                    <article>
                        <h3>${anime.title}</h3>
                        <img src="https://placehold.co/200x300" alt="${anime.title}"/>
                    </article>
                </li>`
        } else {
            listAnimes.innerHTML += 
                `<li id="${anime.mal_id}" class="animes js-anime">
                    <article>
                        <h3>${anime.title}</h3>
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="image-animes"/>
                    </article>
                </li>`
        }
        listenerAnimeCards();
        
    }
}

//Llamada a la API

function handleSearch(event){
    event.preventDefault();
    const inputValue = input.value.toLowerCase().trim();
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        animes = data.data;
        renderAnimes(animes);
        localStorage.setItem('animesServer', JSON.stringify(animes));
    });
}

btnSearch.addEventListener('click', handleSearch);






//Reset button

function handleReset () {
    input.value = '';
    listAnimes.innerHTML = '';

}

btnReset.addEventListener('click', handleReset);