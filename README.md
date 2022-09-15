## Cinema Site Top Films
### А simple site displaying the top popular movies, with a search function.
### This is my first experience in using Api third party services.
![preview-1](https://i.ibb.co/g3NqfbJ/Screenshot-1.png)
#### This is how the main page looks like, it contains the most popular films, I took this data from the site https://kinopoiskapiunofficial.tech/
___
![preview-3](https://i.ibb.co/8BjvV6F/Screenshot-3.png)
### An example of a modal window that fires when you click on a card with a movie
### Closing a modal window is implemented in two ways.
```
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
```
___
![preview-2](https://i.ibb.co/3p0jC3F/2.png)
### An example of the search on the page through the input located on the top right

### Using fetch to display movie cards.
```
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
```
### Using fetch to use a modal window.
```
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
```
___
#### *The site from where I took the unofficial api of the "kinopoisk" services - [at this link](https://kinopoiskapiunofficial.tech/)*
