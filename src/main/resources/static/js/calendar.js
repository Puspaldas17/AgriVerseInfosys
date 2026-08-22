const API_URL = "http://localhost:8082/api/crop-calendar";

const cropForm = document.getElementById("cropForm");
const cropList = document.getElementById("cropList");


// Get all crops
async function loadCrops() {
    try {
        const response = await fetch(API_URL);
        const crops = await response.json();

        cropList.innerHTML = "";

        crops.forEach(crop => {
            const card = document.createElement("div");
            card.className = "crop-card";

            card.innerHTML = `
                <h3>${crop.cropName}</h3>
                <p><strong>Season:</strong> ${crop.season}</p>
                <p><strong>Sowing:</strong> ${crop.sowingStartMonth} - ${crop.sowingEndMonth}</p>
                <p><strong>Harvest:</strong> ${crop.harvestStartMonth} - ${crop.harvestEndMonth}</p>
                <p><strong>Water:</strong> ${crop.waterRequirement}</p>
                <p><strong>Soil:</strong> ${crop.soilType}</p>
                <p><strong>Description:</strong> ${crop.description}</p>

                <button class="delete-btn"
                    onclick="deleteCrop('${crop.id}')">
                    Delete
                </button>
            `;

            cropList.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading crops:", error);
    }
}


// Add crop
cropForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const crop = {
        cropName: document.getElementById("cropName").value,
        season: document.getElementById("season").value,
        sowingStartMonth: document.getElementById("sowingStartMonth").value,
        sowingEndMonth: document.getElementById("sowingEndMonth").value,
        harvestStartMonth: document.getElementById("harvestStartMonth").value,
        harvestEndMonth: document.getElementById("harvestEndMonth").value,
        waterRequirement: document.getElementById("waterRequirement").value,
        soilType: document.getElementById("soilType").value,
        description: document.getElementById("description").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crop)
        });

        if (response.ok) {
            alert("Crop added successfully!");
            cropForm.reset();
            loadCrops();
        } else {
            alert("Failed to add crop.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Server error.");
    }
});


// Delete crop
async function deleteCrop(id) {

    if (!confirm("Are you sure you want to delete this crop?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (response.ok || response.status === 204) {
            alert("Crop deleted successfully!");
            loadCrops();
        } else {
            alert("Failed to delete crop.");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}


// Load crops when page opens
loadCrops();