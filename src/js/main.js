'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const listAnimes = document.querySelector('.js-list');
const favoriteAnimes = document.querySelector('.js-favorite-list');
const favTitle = document.querySelector('.js-fav-title');
const searchTitle = document.querySelector('.js-search-title');

let animes = [];
let favAnimes = [];

const loadFavoritesFromStorage = () => {
    const dataAnimesLS = localStorage.getItem('favoritesAnimesServer');
    if (dataAnimesLS){
        favAnimes = JSON.parse(dataAnimesLS);
        renderFavoriteAnimes(favAnimes);
    }
};

loadFavoritesFromStorage();

function handleClickFav(event) {
    event.preventDefault();
    const animeClicked = parseInt(event.currentTarget.id);
    const animeSelected = animes.find((eachAnime) => eachAnime.mal_id === animeClicked);
    const indexFavSelected = favAnimes.findIndex((anime) => anime.mal_id === animeClicked);
    console.log(animeSelected);

    if (indexFavSelected === -1) {
        favAnimes.push(animeSelected);
    } else {

    };
    
    renderAnimes(animes);
    renderFavoriteAnimes(favAnimes);

    console.log(favAnimes);
    
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

        const findFavAnime = favAnimes.find((animeFav) => animeFav.mal_id === anime.mal_id);
        let css = findFavAnime ? "favorite" : '';

        if(anime.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            listAnimes.innerHTML += 
                `<li id="${anime.mal_id}" class="${css} animes js-anime">
                    <article>
                        <h3>${anime.title}</h3>
                        <img src="https://placehold.co/200x300" alt="${anime.title}"/>
                    </article>
                </li>`
        } else {
            listAnimes.innerHTML += 
                `<li id="${anime.mal_id}" class="${css} animes js-anime">
                    <article>
                        <h3>${anime.title}</h3>
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="image-animes"/>
                    </article>
                </li>`
        }
        listenerAnimeCards();
        
    }
}

function renderFavoriteAnimes(favorites) {
    
    favoriteAnimes.innerHTML = '';

    for (const favoriteAnime of favorites) {
        
        if(favoriteAnime.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            favoriteAnimes.innerHTML += 
                `<li id="${favoriteAnime.mal_id}" class="animes js-anime">
                    <article>
                        <h3>${favoriteAnime.title}</h3>
                        <img src="https://placehold.co/200x300" alt="${favoriteAnime.title}"/>
                    </article>
                </li>`
        } else {
            favoriteAnimes.innerHTML += 
                `<li id="${favoriteAnime.mal_id}" class="animes js-anime">
                    <article>
                        <h3>${favoriteAnime.title}</h3>
                        <img src="${favoriteAnime.images.jpg.image_url}" alt="${favoriteAnime.title}" class="image-animes"/>
                    </article>
                </li>`
        }

        localStorage.setItem('favoritesAnimesServer', JSON.stringify(favAnimes));
        
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