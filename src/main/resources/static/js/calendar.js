const API_URL = "http://localhost:8082/api/crop-calendar";

let crops = [];
let selectedMonth = "Jan";
let selectedWeather = "All";

const monthMap = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
};


// ===============================
// FETCH CROPS FROM BACKEND
// ===============================

async function loadCrops() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch crop data");
        }

        crops = await response.json();

        displayCrops();

    } catch (error) {

        console.error("Error:", error);

        document.getElementById("cropContainer").innerHTML =
            `<p>Unable to load crop data. Please start the backend.</p>`;
    }
}


// ===============================
// CHECK MONTH
// ===============================

function isMonthInRange(month, startMonth, endMonth) {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const current = months.indexOf(month);
    const start = months.indexOf(startMonth);
    const end = months.indexOf(endMonth);

    if (current === -1 || start === -1 || end === -1) {
        return false;
    }

    // Normal range
    if (start <= end) {
        return current >= start && current <= end;
    }

    // Range crossing December
    return current >= start || current <= end;
}


// ===============================
// DISPLAY CROPS
// ===============================

function displayCrops() {

    const container = document.getElementById("cropContainer");

    container.innerHTML = "";

    const month = monthMap[selectedMonth];

    const filteredCrops = crops.filter(crop => {

        const monthMatch =
            isMonthInRange(
                month,
                crop.sowingStartMonth,
                crop.sowingEndMonth
            ) ||
            isMonthInRange(
                month,
                crop.harvestStartMonth,
                crop.harvestEndMonth
            );

        const weatherMatch =
            selectedWeather === "All" ||
            crop.waterRequirement === selectedWeather;

        return monthMatch && weatherMatch;
    });


    document.getElementById("selectedMonth").textContent =
        selectedMonth;


    if (filteredCrops.length === 0) {

        container.innerHTML =
            `<p>No crops available for ${month}.</p>`;

        return;
    }


    filteredCrops.forEach(crop => {

        const card = document.createElement("div");

        card.className = "crop-card";

        card.innerHTML = `

            <h2>🌱 ${crop.cropName}</h2>

            <p>
                <strong>Season:</strong>
                ${crop.season}
            </p>

            <p>
                <strong>Sowing:</strong>
                ${crop.sowingStartMonth}
                -
                ${crop.sowingEndMonth}
            </p>

            <div class="timeline">

                <div class="sowing-bar">
                    🟢 Sowing
                </div>

            </div>

            <p>
                <strong>Harvest:</strong>
                ${crop.harvestStartMonth}
                -
                ${crop.harvestEndMonth}
            </p>

            <div class="timeline">

                <div class="harvest-bar">
                    🟠 Harvest
                </div>

            </div>

            <p>
                <strong>Water:</strong>
                ${crop.waterRequirement}
            </p>

            <p>
                <strong>Soil:</strong>
                ${crop.soilType}
            </p>

            <p class="description">
                ${crop.description}
            </p>
        `;

        container.appendChild(card);
    });
}


// ===============================
// MONTH BUTTONS
// ===============================

document.querySelectorAll("#monthButtons button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#monthButtons button")
                .forEach(btn =>
                    btn.classList.remove("selected")
                );

            button.classList.add("selected");

            selectedMonth = button.dataset.month;

            displayCrops();
        });
    });


// ===============================
// WEATHER BUTTONS
// ===============================

document.querySelectorAll("#weatherButtons button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("#weatherButtons button")
                .forEach(btn =>
                    btn.classList.remove("selected")
                );

            button.classList.add("selected");

            selectedWeather = button.dataset.weather;

            displayCrops();
        });
    });


// ===============================
// LOAD DATA
// ===============================

loadCrops();