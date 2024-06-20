document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById("calendar");
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");

  const flightSchedule = {
    "Kathmandu to Tokyo": ["Tuesday", "Friday", "Sunday"],
    "Tokyo to Kathmandu": ["Monday", "Wednesday", "Saturday"],
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function populateYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
    yearSelect.value = currentYear;
  }

  function renderCalendar(month, year) {
    calendar.innerHTML = ""; // Clear previous calendar
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill initial empty days to align the first day of the month to the correct weekday
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDiv = document.createElement("div");
      emptyDiv.classList.add("day", "empty");
      calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayName = dayNames[date.getDay()];

      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day");
      dayDiv.innerHTML = `<strong>${dayName} ${day}</strong>`;

      if (flightSchedule["Kathmandu to Tokyo"].includes(dayName)) {
        const flightDiv = document.createElement("div");
        flightDiv.classList.add("flight");
        flightDiv.innerHTML = `<img src="images/nepal.png" class="flag" alt="Nepal Flag"> Kathmandu to Tokyo <img src="images/japan.png" class="flag" alt="Japan Flag">`;
        dayDiv.appendChild(flightDiv);
      }

      if (flightSchedule["Tokyo to Kathmandu"].includes(dayName)) {
        const returnFlightDiv = document.createElement("div");
        returnFlightDiv.classList.add("return-flight");
        returnFlightDiv.innerHTML = `<img src="images/japan.png" class="flag" alt="Japan Flag"> Tokyo to Kathmandu <img src="images/nepal.png" class="flag" alt="Nepal Flag">`;
        dayDiv.appendChild(returnFlightDiv);
      }

      calendar.appendChild(dayDiv);
    }
  }

  monthSelect.addEventListener("change", function () {
    const selectedMonth = parseInt(this.value);
    const selectedYear = parseInt(yearSelect.value);
    renderCalendar(selectedMonth, selectedYear);
  });

  yearSelect.addEventListener("change", function () {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(this.value);
    renderCalendar(selectedMonth, selectedYear);
  });

  // Initialize the year dropdown and calendar with the current month and year
  populateYears();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  renderCalendar(currentMonth, currentYear);
});
