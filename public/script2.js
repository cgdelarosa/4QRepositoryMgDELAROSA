const stars = document.querySelectorAll(".star")
const addMovieBtn = document.getElementById("addMovie")
const movieList = document.getElementById("movieList")

let rating = 0

stars.forEach(star => {
    star.addEventListener("click", () => {

        rating = star.dataset.value

        stars.forEach(s => s.classList.remove("active"))

        for(let i=0;i<rating;i++){
            stars[i].classList.add("active")
        }

    })
})

document.addEventListener("DOMContentLoaded", loadMovies)

function loadMovies(){

    movieList.innerHTML=""

    const movies = JSON.parse(localStorage.getItem("movies")) || []

    movies.forEach(movie => {
        displayMovie(movie)
    })
}

addMovieBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value
    const year = document.getElementById("year").value
    const genre = document.getElementById("genre").value

    const movie = {
        title:title,
        year:year,
        genre:genre,
        rating:rating
    }

    const movies = JSON.parse(localStorage.getItem("movies")) || []

    movies.push(movie)

    localStorage.setItem("movies", JSON.stringify(movies))

    displayMovie(movie)

})

function displayMovie(movie){

    const li = document.createElement("li")

    let stars = "★".repeat(movie.rating)

    li.textContent =
    `${movie.title} (${movie.year}) - ${movie.genre}, Rating: ${stars}`

    movieList.appendChild(li)

}

function displayMovie(movie){

const li = document.createElement("li")

let stars = "★".repeat(movie.rating)

li.innerHTML =
`${movie.title} (${movie.year}) - ${movie.genre}, Rating: 
<span class="movie-stars">${stars}</span>`

movieList.appendChild(li)

}