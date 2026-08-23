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
        const isApproved = !crop.status || crop.status === 'APPROVED';

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

        return isApproved && monthMatch && weatherMatch;
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

        // Helper for timeline styling
        const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const getIdx = (m) => Math.max(0, allMonths.indexOf(m));
        
        function getStyle(start, end) {
            const s = getIdx(start);
            const e = getIdx(end);
            let width = e >= s ? ((e - s + 1) / 12) * 100 : ((12 - s + e + 1) / 12) * 100;
            return `left: ${(s / 12) * 100}%; width: ${Math.min(100, width)}%;`;
        }

        const sowingStyle = getStyle(crop.sowingStartMonth, crop.sowingEndMonth);
        const harvestStyle = getStyle(crop.harvestStartMonth, crop.harvestEndMonth);

        card.innerHTML = `
            <h2 class="card-title">${crop.cropName}</h2>
            <div class="season-badge"><i class="fas fa-sun"></i> ${crop.season} Season</div>

            <div class="timeline-box">
                <div class="timeline-row">
                    <div class="timeline-label">SOW</div>
                    <div class="timeline-bar-container">
                        <div class="timeline-bar bar-sowing" style="${sowingStyle}"></div>
                    </div>
                    <div class="timeline-months">${crop.sowingStartMonth.substring(0,3)} - ${crop.sowingEndMonth.substring(0,3)}</div>
                </div>
                <div class="timeline-row">
                    <div class="timeline-label">HRVST</div>
                    <div class="timeline-bar-container">
                        <div class="timeline-bar bar-harvest" style="${harvestStyle}"></div>
                    </div>
                    <div class="timeline-months">${crop.harvestStartMonth.substring(0,3)} - ${crop.harvestEndMonth.substring(0,3)}</div>
                </div>
            </div>

            <div class="requirements-box">
                <div class="req-badge water-${crop.waterRequirement.toLowerCase()}">
                    <i class="fas fa-tint"></i>
                    <div class="label">Water</div>
                    <div class="value">${crop.waterRequirement}</div>
                </div>
                <div class="req-badge soil-icon">
                    <i class="fas fa-layer-group"></i>
                    <div class="label">Soil</div>
                    <div class="value">${crop.soilType.split(' ')[0]}</div>
                </div>
            </div>

            <div class="crop-description">
                ${crop.description}
            </div>
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

// ===============================
// SUGGEST CROP MODAL
// ===============================

function openSuggestModal() {
    document.getElementById('suggestForm').reset();
    document.getElementById('suggestModal').style.display = 'flex';
}

function closeSuggestModal() {
    document.getElementById('suggestModal').style.display = 'none';
}

async function submitCropSuggestion() {
    const payload = {
        cropName: document.getElementById('suggCropName').value,
        season: document.getElementById('suggCropSeason').value,
        sowingStartMonth: document.getElementById('suggSowingStart').value,
        sowingEndMonth: document.getElementById('suggSowingEnd').value,
        harvestStartMonth: document.getElementById('suggHarvestStart').value,
        harvestEndMonth: document.getElementById('suggHarvestEnd').value,
        waterRequirement: document.getElementById('suggCropWater').value,
        soilType: document.getElementById('suggCropSoil').value,
        description: document.getElementById('suggCropDesc').value,
        status: "PENDING"
    };

    // basic validation
    if (!payload.cropName || !payload.season || !payload.sowingStartMonth || !payload.harvestStartMonth) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Your crop suggestion has been submitted successfully and is pending admin approval!");
            closeSuggestModal();
        } else {
            alert("Failed to submit suggestion. Please try again.");
        }
    } catch (e) {
        alert("Network error occurred.");
        console.error(e);
    }
}