'use strict';

const input = document.querySelector('.js-input');
const btnSearch = document.querySelector('.js-btn-search');
const btnReset = document.querySelector('.js-btn-reset');
const listAnimes = document.querySelector('.js-list');
const favoriteAnimes = document.querySelector('.js-favorite-list');
const favTitle = document.querySelector('.js-fav-title');
const searchTitle = document.querySelector('.js-search-title');
const btnPrevPage = document.querySelector('.js-btn-prev');
const btnNextPage = document.querySelector('.js-btn-next');


let animes = [];
let favAnimes = [];
let currentPage = 1;
let totalPages = 1;

const listenerAnimeCards = () => {
    const allAnimes = document.querySelectorAll('.js-anime');
    for (const eachAnime of allAnimes) {
        eachAnime.addEventListener('click', handleClickFav);
    };
};

const listenerDeleteBtn = () => {
    const btnDeleteFav = document.querySelectorAll('.js-btn-delete-fav');
    for (const eachBtn of btnDeleteFav) {
        eachBtn.addEventListener('click', handleClickBtnDelete);
    };
}


const loadFavoritesFromStorage = () => {
    const dataAnimesLS = localStorage.getItem('favoritesAnimesServer');

    if (dataAnimesLS){
        favAnimes = JSON.parse(dataAnimesLS);
        console.log(favAnimes);
        renderFavoriteAnimes(favAnimes);
    }
};

loadFavoritesFromStorage();



function handleClickFav(event) {
    event.preventDefault();
    const animeClicked = parseInt(event.currentTarget.id);

    const animeSelected = animes.find((eachAnime) => eachAnime.mal_id === animeClicked);
    const indexFavSelected = favAnimes.findIndex((anime) => anime.mal_id === animeClicked);

    if (indexFavSelected === -1) {
        favAnimes.push(animeSelected);
    } else {
        favAnimes.splice(indexFavSelected, 1);
    };
    console.log(favAnimes);
    renderAnimes(animes);
    renderFavoriteAnimes(favAnimes);
    localStorage.setItem('favoritesAnimesServer', JSON.stringify(favAnimes));
    
}

function handleClickBtnDelete(event) {
    event.preventDefault();
    const deleteBtnClicked = parseInt(event.target.dataset.id);
    console.log(deleteBtnClicked);
    const indexFavDelete = favAnimes.findIndex((animeDelete) => animeDelete.mal_id === deleteBtnClicked);
    console.log(indexFavDelete);
    favAnimes.splice(indexFavDelete, 1);

    renderAnimes(animes);
    renderFavoriteAnimes(favAnimes);
    console.log(favAnimes);
    localStorage.setItem('favoritesAnimesServer', JSON.stringify(favAnimes));
    
}


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
                        <h3 class="anime-title">${anime.title}</h3>
                        <img src="https://placehold.co/120x180" alt="${anime.title}" class="image-animes"/>
                    </article>
                </li>`
        } else {
            listAnimes.innerHTML += 
                `<li id="${anime.mal_id}" class="${css} animes js-anime">
                    <article>
                        <h3 class="anime-title">${anime.title}</h3>
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="image-animes"/>
                    </article>
                </li>`
        }
        listenerAnimeCards();
        
        
    }
}

//Pintar los favoritos
function renderFavoriteAnimes(favorites) {
    
    favoriteAnimes.innerHTML = '';

    for (const favoriteAnime of favorites) {

        if(favoriteAnime.images.jpg.image_url === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") {
            
            favoriteAnimes.innerHTML += 
                `<li id="${favoriteAnime.mal_id}" class="animes">
                    <button class="btn-delete-fav js-btn-delete-fav" data-id="${favoriteAnime.mal_id}">X</button>
                    <article  class=" fav-anime">
                        <h3 class="anime-title">${favoriteAnime.title}</h3>
                        <img src="https://placehold.co/120x180" alt="${favoriteAnime.title}" class="image-animes"/>
                    </article>
                </li>`
        } else {
            favoriteAnimes.innerHTML += 
                `<li id="${favoriteAnime.mal_id}" class="animes">
                    <button class="btn-delete-fav js-btn-delete-fav" data-id="${favoriteAnime.mal_id}">X</button>
                        <article class=" fav-anime">
                        <h3 class="anime-title">${favoriteAnime.title}</h3>
                        <img src="${favoriteAnime.images.jpg.image_url}" alt="${favoriteAnime.title}" class="image-animes"/>
                    </article>
                </li>`
        }

        localStorage.setItem('favoritesAnimesServer', JSON.stringify(favAnimes));
        
        listenerDeleteBtn();
        
    }  
    
}

function handleResetFavorites() {
    favoriteAnimes.innerHTML = '';
    favAnimes = [];
    localStorage.removeItem('favoritesAnimesServer');
    renderAnimes(animes);
}

function resetFavorites() {
    const btnResetFavorites = document.querySelector('.js-btn-reset-fav');
    btnResetFavorites.addEventListener('click', handleResetFavorites)
}

resetFavorites();


//Buscar
function handleSearch(event){
    event.preventDefault();
    const inputValue = input.value.toLowerCase().trim();
    fetchAnimes(inputValue, 1);
}

//Petición a la API
function fetchAnimes(query, page) {

    let url = `https://api.jikan.moe/v4/anime?q=${query}`
    if (page > 1) {
        url += `&page=${page}`
    }
    console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log('API Response: ', data )
        animes = data.data;
        renderAnimes(animes);

        if(data.pagination && data.pagination.last_visible_page) {
            totalPages = data.pagination.last_visible_page;
            console.log("Total Pages:", totalPages);
        } else {
            console.log("Pagination not available or only one page");
            totalPages = 1;
        }
        
        updatePaginationButtons();
    })
}

//Botones next y prev
function updatePaginationButtons() {

    if(currentPage === 1) {
        btnPrevPage.disabled = true;
    } else {
        btnPrevPage.disabled = false;
    }

    if(currentPage === totalPages) {
        btnNextPage.disabled = true;
    } else {
        btnNextPage.disabled = false;
    }

}

//Navegación next page
function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        const inputValue = input.value.toLowerCase().trim();
        fetchAnimes(inputValue, currentPage);
    }
}

//Navegación prev page
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        const inputValue = input.value.toLowerCase().trim();
        fetchAnimes(inputValue, currentPage);
    }
}

btnNextPage.addEventListener('click', goToNextPage);
btnPrevPage.addEventListener('click', goToPrevPage);


btnSearch.addEventListener('click', handleSearch);

//Reset button

function handleReset () {
    input.value = '';
    listAnimes.innerHTML = '';
    favoriteAnimes.innerHTML = '';
    animes = [];
    favAnimes = [];
    localStorage.removeItem('favoritesAnimesServer');
    localStorage.removeItem('animesServer');
    renderAnimes(animes);
    renderFavoriteAnimes(favAnimes);    

}

btnReset.addEventListener('click', handleReset);