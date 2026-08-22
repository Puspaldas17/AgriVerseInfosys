function showTab(tabId) {

    const contents = document.querySelectorAll(".tab-content");

    contents.forEach(content => {
        content.style.display = "none";
        content.classList.remove("active");
    });


    const buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(button => {
        button.classList.remove("active");
    });


    document.getElementById(tabId).style.display = "block";
    document.getElementById(tabId).classList.add("active");

}


window.onload = function () {
    showTab("solution");

    // Restore saved theme preference
    if (localStorage.getItem('farmverse-theme') === 'light') {
        document.body.classList.add('light-mode');
        const btn = document.getElementById("theme-toggle");
        if (btn) btn.innerHTML = "🌙";
    }
};

const language = document.getElementById("language");

if (language) {
    language.addEventListener("change", function () {

        if (this.value === "en") {
            document.getElementById("title").innerText = "Welcome to AgriVerse";
        }

        else if (this.value === "te") {
            document.getElementById("title").innerText = "అగ్రివర్స్‌కు స్వాగతం";
        }

        else if (this.value === "hi") {
            document.getElementById("title").innerText = "एग्रीवर्स में आपका स्वागत है";
        }

    });
}

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        // Default is DARK — toggle switches to LIGHT
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeToggle.innerHTML = "🌙"; // In light mode → click to go back to dark (moon)
            localStorage.setItem('farmverse-theme', 'light');
        } else {
            themeToggle.innerHTML = "☀️"; // In dark mode → click to go to light (sun)
            localStorage.setItem('farmverse-theme', 'dark');
        }
    });

    // Set correct initial icon
    if (!localStorage.getItem('farmverse-theme') || localStorage.getItem('farmverse-theme') === 'dark') {
        themeToggle.innerHTML = "☀️"; // Dark is default, show sun to switch to light
    }
}