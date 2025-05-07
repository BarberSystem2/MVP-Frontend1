const API_URL = "http://localhost:8080/bookings/getbookings"; // ← Udskift med din rigtige API-URL

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#bookingTable tbody");

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fejl ved hentning: ${response.statusText}`);
            }
            return response.json();
        })
        .then(bookings => {
            console.log(bookings); // Log dataen for at se strukturen

            bookings.forEach(booking => {
                const row = document.createElement("tr");

                // Log dataen for den enkelte booking
                console.log(booking);

                row.innerHTML = `
                    <td>${booking.bookingId}</td>
                    <td>${booking.salonName}</td>
                    <td>${booking.bookingDate}</td>
                    <td>${booking.bookingTime}</td>
                    <td>${booking.costumerName}</td>
                    <td>${booking.employeeName}</td>
                    <td>${booking.serviceType}</td>
                    <td>${booking.serviceTypePrice}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            tbody.innerHTML = `<tr><td colspan="8">Kunne ikke hente data: ${error.message}</td></tr>`;
            console.error("Fejl ved hentning af bookingdata:", error);
        });
});
