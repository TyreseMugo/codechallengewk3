document.addEventListener("DOMContentLoaded", () => {
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieShowtime = document.getElementById("movie-showtime");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");
    const filmsList = document.getElementById("films");
 
   
    function updateMovieDetails(movie) {
      moviePoster.src = movie.poster;
      movieTitle.textContent = movie.title;
      movieRuntime.textContent = movie.runtime + " minutes";
      movieShowtime.textContent = movie.showtime;
      const ticketsAvailable = movie.capacity - movie.tickets_sold;
      availableTickets.textContent = ticketsAvailable;
 
 
      buyTicketButton.disabled = ticketsAvailable === 0;
    }
 
 
    fetch("http://localhost:3000/films/1")
      .then((response) => response.json())
      .then((data) => {
        const film = data;
        updateMovieDetails(film);
      })
      .catch((error) => console.error("Error:", error));
 
 
    fetch("http://localhost:3000/films")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((movie) => {
          const filmItem = document.createElement("li");
          filmItem.textContent = movie.title;
          filmItem.classList.add("film", "item");
          filmItem.setAttribute("data-movie-id", movie.id);
          filmsList.appendChild(filmItem);
 
          filmItem.addEventListener("click", () => {
            fetch(`http://localhost:3000/films/${movie.id}`)
              .then((response) => response.json())
              .then((data) => {
                updateMovieDetails(data);
              });
          });
        });
      });
 
    // Event listener for buying a ticket
    buyTicketButton.addEventListener("click", () => {
      const currentTickets = parseInt(availableTickets.textContent, 10);
      if (currentTickets > 0) {
        const newTicketsSold = currentTickets - 1;
        availableTickets.textContent = newTicketsSold;
        // Send a request to the server to update the available tickets count
        fetch(`http://localhost:3000/films/1/purchase`, {
          method: "PUT",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Ticket purchased successfully");
          })
          .catch((error) => {
            console.error("Error purchasing ticket:", error);
          });
      }
    });
  });
