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
