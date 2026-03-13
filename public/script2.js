const stars = document.querySelectorAll(".star")
const addMovieBtn = document.getElementById("addMovie")
const movieList = document.getElementById("movieList")

let rating = 0

// STAR RATING
stars.forEach(star => {
    star.addEventListener("click", () => {

        rating = Number(star.dataset.value)

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


// ADD OR UPDATE MOVIE
addMovieBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value
    const year = document.getElementById("year").value
    const genre = document.getElementById("genre").value

    if(title === "" || year === "" || rating === 0){
        alert("Please fill all fields and select rating")
        return
    }

    const movies = JSON.parse(localStorage.getItem("movies")) || []

    const existingMovie = movies.find(m => 
        m.title.toLowerCase() === title.toLowerCase()
    )

    if(existingMovie){

        // UPDATE (average rating)
        existingMovie.rating = Math.round(
            (Number(existingMovie.rating) + Number(rating)) / 2
        )

        existingMovie.year = year
        existingMovie.genre = genre

    } else {

        const movie = {
            title:title,
            year:year,
            genre:genre,
            rating:rating
        }

        movies.push(movie)
    }

    localStorage.setItem("movies", JSON.stringify(movies))

    loadMovies()

})


// DISPLAY MOVIE
function displayMovie(movie){

    const li = document.createElement("li")

    let starsDisplay = "★".repeat(movie.rating)

    li.innerHTML =
    `${movie.title} (${movie.year}) - ${movie.genre}, Rating: 
    <span class="movie-stars">${starsDisplay}</span>
    <button class="delete-btn">Delete</button>`

    const deleteBtn = li.querySelector(".delete-btn")

    deleteBtn.addEventListener("click", () => {

        const confirmDelete = confirm("Are you sure you want to delete?")

        if(confirmDelete){

            let movies = JSON.parse(localStorage.getItem("movies")) || []

            movies = movies.filter(m => m.title !== movie.title)

            localStorage.setItem("movies", JSON.stringify(movies))

            loadMovies()

        }

    })

    movieList.appendChild(li)

}