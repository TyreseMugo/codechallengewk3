document.addEventListener("DOMContentLoaded", () => {
  const filmsList = document.getElementById("films");
  const movieTitle = document.getElementById("movie-title");
  const movieDescription = document.getElementById("movie-description");
  const movieRuntime = document.getElementById("movie-runtime");
  const movieShowtime = document.getElementById("movie-showtime");
  const availableTickets = document.getElementById("available-tickets");
  const moviePoster = document.getElementById("movie-poster");

  async function renderFilms() {
    try {
      const response = await fetch("http://localhost:3000/films");
      const data = await response.json();

      data.forEach((film) => {
        const divList = document.createElement("div");
        divList.className = "divList-content";

        const image = document.createElement("img");
        image.className = "posters";

        const title = document.createElement("h3");
        title.className = "title";

        const description = document.createElement("p");

        const capacity = document.createElement("p");

        const ticketSold = document.createElement("p");

        const buttonTicket = document.createElement("button");
        buttonTicket.className = "ticket";
        buttonTicket.textContent = "Buy Ticket";

        const divTime = document.createElement("div");
        divTime.className = "divTime";

        const runTime = document.createElement("p");

        const showTime = document.createElement("p");

        image.src = `${film.poster}`;
        title.textContent = `${film.title}`;
        description.textContent = `${film.description}`;
        capacity.textContent = `Capacity: ${film.capacity}`;
        ticketSold.textContent = `Ticket Sold: ${film.tickets_sold}`;
        runTime.textContent = `Duration: ${film.runtime} Minutes`;
        showTime.textContent = `${film.showtime}`;

        divList.appendChild(image);
        divList.appendChild(title);
        divList.appendChild(description);
        divList.appendChild(capacity);
        divList.appendChild(ticketSold);
        divList.appendChild(buttonTicket);
        divList.appendChild(divTime);
        divTime.appendChild(runTime);
        divTime.appendChild(showTime);

        buttonTicket.addEventListener("click", () => {
          if (film.tickets_sold < film.capacity) {
            film.tickets_sold++;
            ticketSold.textContent = film.capacity - film.tickets_sold;
            // Send a request to the server to update the available tickets count
            fetch(`http://localhost:3000/films/${film.id}/purchase`, {
              method: "PATCH",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Ticket purchased successfully");
              })
              .catch((error) => {
                console.error("Error purchasing ticket:", error);
              });
          } else {
            alert("Sorry, this show is sold out.");
          }
        });

        filmsList.appendChild(divList);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const fetchData = renderFilms();
});
