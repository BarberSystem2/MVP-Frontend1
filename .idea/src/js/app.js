document.addEventListener("DOMContentLoaded", () => {
    const employeeSelect = document.getElementById("employeeSelect");
    const serviceTypeSelect = document.getElementById("serviceTypeSelect");
    const bookingForm = document.getElementById("bookingForm");
    const dateInput = document.getElementById("bookingDate");
    const timeSelect = document.getElementById("bookingTime");
    const responseDiv = document.getElementById("response");

    const API_URL = "http://localhost:8080";

    const availableTimes = [
        "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "13:00", "13:30",
        "14:00", "14:30"
    ];

    async function loadEmployees() {
        try {
            const res = await fetch(`${API_URL}/employee/allEmployees`);
            const employees = await res.json();
            console.log("Employees loaded:", employees);

            employees.forEach(emp => {
                const option = document.createElement("option");
                option.value = emp.employeeId
                option.textContent = emp.employeeName
                employeeSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Fejl ved hentning af employees:", error);
        }
    }

    async function loadServiceType() {
        try {
            const res = await fetch(`${API_URL}/serviceType/getAll`);
            const servicetypes = await res.json();
            console.log("Service types loaded:", servicetypes);

            servicetypes.forEach(ser => {
                const option = document.createElement("option");
                option.value = ser.serviceTypeId;  // brug det korrekte felt
                option.textContent = `${ser.serviceType} - ${ser.serviceTypePrice} DKK - ${ser.estimatedTimer} min.`;
                serviceTypeSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Fejl ved hentning af service types:", error);
        }
    }

    dateInput.addEventListener("change", () => {
        timeSelect.innerHTML = '<option value="">-- Vælg --</option>';
        availableTimes.forEach(time => {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    });

    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const dto = {
            customerName: document.getElementById("customerName").value,
            employeeId: parseInt(employeeSelect.value),
            serviceTypeId: parseInt(serviceTypeSelect.value),
            salonId: 1,
            bookingdate: dateInput.value,
            bookingtime: timeSelect.value
        };

        try {
            const res = await fetch(`${API_URL}/bookings/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto)
            });

            const data = await res.json();
            responseDiv.innerHTML = `
                <strong>Booking bekræftet!</strong><br />
                Kunde: ${data.costumerName || dto.customerName}<br />
                Medarbejder: ${data.employerName || "Ukendt"}<br />
                Service: ${data.serviceName || "Ukendt"}<br />
                Pris: ${data.servicePrice || "?"} DKK<br />
                Dato: ${data.bookingDate || dto.bookingdate}<br />
                Tid: ${data.bookingTimeStart || dto.bookingtime}
            `;
        } catch (error) {
            responseDiv.innerHTML = "Noget gik galt under bookingen. Prøv igen.";
            console.error("Fejl ved booking:", error);
        }
    });

    // Load data ved start
    loadEmployees();
    loadServiceType();
});
