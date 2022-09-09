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
___
#### *The site from where I took the unofficial api of the "kinopoisk" services - [at this link](https://kinopoiskapiunofficial.tech/)*
