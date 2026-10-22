
function generate() {
    let year = Number(document.getElementById("year").value);
    let month = document.getElementById("month").value;

    if (!year || year < 1 || month === "") {
        alert("Enter a valid year and select a month!");
        return;
    }

    month = Number(month);

    let firstDay = new Date(year, month, 1).getDay();
    let days = new Date(year, month + 1, 0).getDate();

    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    document.getElementById("title").textContent =
        new Date(year, month).toLocaleString("en", {
            month: "long", year: "numeric"
        });

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        .forEach(day => {
            calendar.innerHTML += `<div class="day">${day}</div>`;
        });

    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= days; i++) {
        calendar.innerHTML += `<div>${i}</div>`;
    }
}

function resetCalendar() {
    document.getElementById("year").value = "";
    document.getElementById("month").value = "";
    document.getElementById("title").textContent = "";
    document.getElementById("calendar").innerHTML = "";
}
