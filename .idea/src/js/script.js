const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");
const form = document.getElementById("bookingForm");
const summary = document.getElementById("summary");

// Simuler ledige tider (du kan ændre disse)
const availableTimes = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "13:00", "13:30",
    "14:00", "14:30"
];

dateInput.addEventListener("change", () => {
    timeSelect.innerHTML = '<option value="">-- Vælg --</option>';
    availableTimes.forEach(time => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const employee = document.getElementById("employee").value;
    const date = dateInput.value;
    const time = timeSelect.value;
    const service = document.getElementById("service").value;

    if (employee && date && time && service) {
        summary.innerHTML = `
      <h2>Booking bekræftet</h2>
      <p><strong>Medarbejder:</strong> ${employee}</p>
      <p><strong>Dato:</strong> ${date}</p>
      <p><strong>Tid:</strong> ${time}</p>
      <p><strong>Service:</strong> ${service}</p>
    `;
        summary.style.display = "block";
        form.reset();
        timeSelect.innerHTML = '<option value="">-- Vælg dato først --</option>';
    }
});
