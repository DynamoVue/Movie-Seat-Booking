const seatBooking = document.querySelector('#seat-booking');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.querySelector('.movie-booking #movie');

let ticketPrice = parseInt(movieSelect.value);

document.addEventListener('DOMContentLoaded', loadSelectedSeats);

// handle Ticket Price

movieSelect.addEventListener('change', function(e) {
    ticketPrice = e.target.value;
    selectedMovieIndex = e.target.selectedIndex;    

    updateSelectedCount(); 
})

// function handle Loading selected seats from LocalStorage

function loadSelectedSeats() {
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    
    if (bookingDetails) {
        const { selectedSeatsIndex, selectedMovieIndex } = bookingDetails;

        seats.forEach(seat => {
            const seatIndex = [...seats].indexOf(seat);

            if (selectedSeatsIndex.indexOf(seatIndex) > -1 ) {
                seat.classList.add('selected');
            }
        })

        movieSelect.selectedIndex = selectedMovieIndex;
        ticketPrice = movieSelect.value;

        updateBookingDescription(selectedSeatsIndex);
    }
}

// Handle Selected Seats

seatBooking.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    } 
})
 

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected Seats Into New Arr ( Store index of selected seats )
    const selectedSeatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    })

    updateBookingDescription(selectedSeats);

    const bookingDetails = {
        selectedSeatsIndex,
        selectedMovieIndex: movieSelect.selectedIndex
    }

    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
}

function updateBookingDescription(selectedSeats) {
    count.innerText = selectedSeats.length;

    total.innerText = `${count.innerText * ticketPrice}$`
}