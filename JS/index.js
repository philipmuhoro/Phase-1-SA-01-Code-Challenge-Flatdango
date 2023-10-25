// Define a function to fetch movie details and update the DOM
function fetchMovieDetails(movieId) {
    fetch(`https://my-json-server.typicode.com/philipmuhoro/Phase-1-SA-01-Code-Challenge-Flatdango/films/${movieId}`)
        .then((response) => response.json())
        .then((data) => {
            // Update the DOM with movie details
            const posterImg = document.getElementById('movie-poster');
            const title = document.getElementById('movie-title');
            const runtime = document.getElementById('movie-runtime');
            const showtime = document.getElementById('movie-showtime');
            const availableTickets = document.getElementById('movie-tickets');
            const description = document.getElementById('movie-description');
            const buyTicketButton = document.getElementById("buy-ticket");

            posterImg.src = data.poster;
            title.textContent = data.title;
            runtime.textContent = `Runtime: ${data.runtime} minutes`;
            showtime.textContent = `Showtime: ${data.showtime}`;
            availableTickets.textContent = `Available Tickets: ${data.capacity - data.tickets_sold}`;
            description.textContent = data.description;
            
            
            

            // Set the selectedMovie to the current movie data
            selectedMovie = data;
        });
}

// Define a function to fetch the list of movies and populate the menu
function fetchMovieList() {
    fetch('https://my-json-server.typicode.com/philipmuhoro/Phase-1-SA-01-Code-Challenge-Flatdango/films')
        .then((response) => response.json())
        .then((data) => {
            // Get the menu element
            const menu = document.getElementById('films');
            const movieListHTML = data.map(movie => {
                return `<div class="movie-item" onclick="fetchMovieDetails(${movie.id})">${movie.title}</div>`;
            }).join('');

            // Populate the menu with movie titles
            menu.innerHTML = movieListHTML;
        });
}

// Function to handle the "Buy Ticket" button click
function buyTicket() {
    if (selectedMovie && parseInt(availableTickets.textContent.split(' ')[2]) > 0) {
        const newAvailableTickets = parseInt(availableTickets.textContent.split(' ')[2]) - 1;
        availableTickets.textContent = `Available Tickets: ${newAvailableTickets}`;
        selectedMovie.tickets_sold++;

        if (newAvailableTickets === 0) {
            alert("Tickets are sold out!");
        }
    }
}



// Fetch movie details and movie list when the page loads
fetchMovieList();
