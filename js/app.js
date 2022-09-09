const API_KEY = "197446f3-9eab-475d-a19f-9ffdb741466c";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"

getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");

    // Очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
        )}</div>
        ${
            movie.rating &&
            `
        <div class="movie__average movie__average--${getClassByRate(
                movie.rating
            )}">${movie.rating}</div>
        `
        }
      </div>
        `;
        movieEl.addEventListener("click", () => openModal(movie.filmId))
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
        getMovies(apiSearchUrl);

        search.value = "";
    }
});

// Модальное окно
const modalEl = document.querySelector(".modal");

async function openModal(id) {
    const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();

    modalEl.classList.add("modal--show");
    document.body.classList.add("stop-scrolling");

    modalEl.innerHTML = `
    <div class="modal__card">
     <div class="box-1">
        <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
     </div>
     <div class="box-2">
        <span class="modal__movie-title">${respData.nameRu}</span>
        <span class="modal__movie-release-year"> - ${respData.year}</span>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
        ${respData.filmLength ? `<li class="modal__movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
        <li >Сайт: <a class="modal__movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
        <li class="modal__movie-overview">Описание - ${respData.description}</li>
      </ul>
    </div>
    </div>
  `
}

function closeModal() {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

// Закрытие по клику вне модального окна
window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
        closeModal();
    }
})

// Закрытие по нажатию ESC на клавиатуре
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
})