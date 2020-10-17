const container = document.querySelector('.container');
// querySelectorAll puts its findings into a NodeList, which is like an array
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Adding the '+' sign here turns a string into a number
let ticketPrice = +movieSelect.value;

//Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // spread operator copies the values of the NodeList into a regular array
  // Getting the array of indices to store them to the browser
  const seatsIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  // key-value pair, where keys and values must be strings
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  // In the dev tools, go to Application -> Local Storage to see what's currently stored

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  // e.target will give us any element in the container that is clicked

  // We only care about the items with the class of 'seat'
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // Adding or removing the 'selected' class
    e.target.classList.toggle('selected');
    // Updated the total seats and money
    updateSelectedCount();
  }
});
