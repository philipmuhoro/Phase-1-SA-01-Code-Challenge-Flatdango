// DOM elements
const movieDetails = document.getElementById("movie-details");
const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieRuntime = document.getElementById("movie-runtime");
const movieShowtime = document.getElementById("movie-showtime");
const availableTickets = document.getElementById("available-tickets");
const buyTicketButton = document.getElementById("buy-ticket");
const movieList = document.getElementById("films");

let selectedMovie = null;

// Function to update movie details when a movie is selected
function updateMovieDetails(movie) {
    movieDetails.style.display = "block";
    moviePoster.src = movie.poster;
    movieTitle.textContent = movie.title;
    movieRuntime.textContent = `${movie.runtime} minutes`;
    movieShowtime.textContent = movie.showtime;
    availableTickets.textContent = movie.capacity - movie.tickets_sold;
    selectedMovie = movie;
}

// Function to create a list item with movie details
function createMovieListItem(movie) {
    const li = document.createElement("li");
    li.dataset.id = movie.id;
    li.dataset.title = movie.title;
    li.dataset.runtime = movie.runtime;
    li.dataset.showtime = movie.showtime;
    li.dataset.capacity = movie.capacity;
    li.dataset.tickets_sold = movie.tickets_sold;

    const posterImg = document.createElement("img");
    posterImg.src = movie.poster;
    posterImg.alt = movie.title;

    const movieTitleLink = document.createElement("a");
    movieTitleLink.href = "#";
    movieTitleLink.textContent = movie.title;

    li.appendChild(posterImg);
    li.appendChild(movieTitleLink);

    return li;
}

// Function to handle ticket purchase
function buyTicket() {
    if (selectedMovie && parseInt(availableTickets.textContent) > 0) {
        const newAvailableTickets = parseInt(availableTickets.textContent) - 1;
        availableTickets.textContent = newAvailableTickets;
        selectedMovie.tickets_sold++;
    }
}

// Function to fetch movie data from the JSON server
function fetchMovieData() {
    fetch('https://my-json-server.typicode.com/philipmuhoro.github.io/Phase-1-SA-01-Code-Challenge-Flatdango/') // Change this URL when deploying
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const firstMovie = data[0]; // Get the first movie
                updateMovieDetails(firstMovie);

                data.forEach(movie => {
                    const li = createMovieListItem(movie);
                    movieList.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Error fetching movie data: " + error));
}

// Event listener for selecting movie 
movieList.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        const movieId = event.target.parentElement.dataset.id;
        const selectedMovie = data.find(movie => movie.id === movieId);
        if (selectedMovie) {
            updateMovieDetails(selectedMovie);
        }
    }
});

// Event listener for purchasing tickets
buyTicketButton.addEventListener("click", buyTicket);

// Fetch movie data when the page loads
fetchMovieData();

