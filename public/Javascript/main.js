// Sample list of available seats
let totalSeats = 10; // Number of seats
let takenSeats = []; // Array to hold randomly taken seats

// Function to randomly mark some seats as taken
function initializeSeats() {
    takenSeats = generateRandomTakenSeats(3); // Randomly take 3 seats
    const seatDropdown = document.getElementById('seat');
    seatDropdown.innerHTML = ''; // Clear previous seat options

    // Loop to create seat options and mark unavailable ones
    for (let i = 1; i <= totalSeats; i++) {
        const option = document.createElement('option');
        option.value = i;

        if (takenSeats.includes(i)) {
            option.textContent = `Seat ${i} (Taken)`;
            option.disabled = true; // Disable taken seats
        } else {
            option.textContent = `Seat ${i}`;
        }

        seatDropdown.appendChild(option);
    }
}

// Function to generate random seats taken
function generateRandomTakenSeats(count) {
    let takenSeats = [];
    while (takenSeats.length < count) {
        const seatNumber = Math.floor(Math.random() * totalSeats) + 1;
        if (!takenSeats.includes(seatNumber)) {
            takenSeats.push(seatNumber);
        }
    }
    return takenSeats;
}

// Function to proceed to checkout
function proceedToCheckout(destination, price, departureTime) {
    document.getElementById('bus-destination').textContent = `${destination} - ₦${price}`;
    document.getElementById('checkout-form').style.display = 'block';

    // Store selected bus info for receipt generation
    document.getElementById('departure-time').textContent = departureTime;
    
    initializeSeats(); // Initialize seat options when proceeding to checkout
}

// Form submission event handler
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Capture form details
    const selectedSeat = document.getElementById('seat').value;
    const customerName = document.getElementById('name').value;
    const customerPhone = document.getElementById('phone').value;
    const customerEmail = document.getElementById('email').value;
    const busInfo = document.getElementById('bus-destination').textContent;
    const departureTime = document.getElementById('departure-time').textContent;

    // Generate a random ticket number
    const ticketNumber = Math.floor(Math.random() * 1000000) + 1;

    // Display receipt information
    document.getElementById('ticket-number').textContent = ticketNumber;
    document.getElementById('bus-info').textContent = busInfo;
    document.getElementById('seat-number').textContent = selectedSeat;
    document.getElementById('customer-name').textContent = customerName;
    document.getElementById('customer-phone').textContent = customerPhone;
    document.getElementById('customer-email').textContent = customerEmail;
    document.getElementById('departure-time').textContent = departureTime;

    // Show receipt section
    document.getElementById('receipt').style.display = 'block';

    // Generate downloadable receipt content
    const receiptContent = `
        Ticket Number: ${ticketNumber}\n
        Bus: ${busInfo}\n
        Seat Number: ${selectedSeat}\n
        Customer Name: ${customerName}\n
        Phone Number: ${customerPhone}\n
        Email: ${customerEmail}\n
        Departure Time: ${departureTime}
    `;

    // Create a downloadable file link
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const downloadLink = document.getElementById('download-receipt');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `ticket_${ticketNumber}.txt`;
});
