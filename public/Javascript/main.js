// Bus Selection Page Logic (index.html)
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    document.querySelectorAll('.checkout-button').forEach(button => {
        button.addEventListener('click', function () {
            const destination = this.getAttribute('data-destination');
            const price = this.getAttribute('data-price');
            const time = this.getAttribute('data-time');

            // Store bus details in sessionStorage
            sessionStorage.setItem('busDestination', destination);
            sessionStorage.setItem('busPrice', price);
            sessionStorage.setItem('departureTime', time);

            // Redirect to checkout page
            window.location.href = '/checkout.html';
        });
    });
}

// Checkout Page Logic (checkout.html)
if (window.location.pathname === '/checkout.html') {
    // Retrieve bus details and display them
    document.getElementById('bus-destination').textContent = `${sessionStorage.getItem('busDestination')} - ₦${sessionStorage.getItem('busPrice')}`;

    // Populate seat options
    const seatDropdown = document.getElementById('seat');
    const takenSeats = [1, 3, 5]; // Example of taken seats

    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Seat ${i}` + (takenSeats.includes(i) ? ' (Taken)' : '');
        if (takenSeats.includes(i)) option.disabled = true;
        seatDropdown.appendChild(option);
    }

    // Handle form submission
    document.getElementById('booking-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Store booking details
        sessionStorage.setItem('selectedSeat', document.getElementById('seat').value);
        sessionStorage.setItem('customerName', document.getElementById('name').value);
        sessionStorage.setItem('customerPhone', document.getElementById('phone').value);
        sessionStorage.setItem('customerEmail', document.getElementById('email').value);

        // Redirect to receipt page
        window.location.href = '/receipt.html';
    });
}

// Receipt Page Logic (receipt.html)
if (window.location.pathname === '/receipt.html') {
    // Populate receipt data
    document.getElementById('ticket-number').textContent = Math.floor(Math.random() * 1000000);
    document.getElementById('bus-info').textContent = `${sessionStorage.getItem('busDestination')} - ₦${sessionStorage.getItem('busPrice')}`;
    document.getElementById('seat-number').textContent = sessionStorage.getItem('selectedSeat');
    document.getElementById('customer-name').textContent = sessionStorage.getItem('customerName');
    document.getElementById('customer-phone').textContent = sessionStorage.getItem('customerPhone');
    document.getElementById('customer-email').textContent = sessionStorage.getItem('customerEmail');
    document.getElementById('departure-time').textContent = sessionStorage.getItem('departureTime');

    // Generate downloadable receipt
    const receiptContent = `
        Ticket Number: ${document.getElementById('ticket-number').textContent}\n
        Bus: ${document.getElementById('bus-info').textContent}\n
        Seat Number: ${document.getElementById('seat-number').textContent}\n
        Customer Name: ${document.getElementById('customer-name').textContent}\n
        Phone Number: ${document.getElementById('customer-phone').textContent}\n
        Email Address: ${document.getElementById('customer-email').textContent}\n
        Departure Time: ${document.getElementById('departure-time').textContent}
    `;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const downloadLink = document.getElementById('download-receipt');
    downloadLink.href = URL.createObjectURL(blob);
}
