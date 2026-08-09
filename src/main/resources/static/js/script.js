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
};
const language = document.getElementById("language");

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
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = "☀";
    } else {
        themeToggle.innerHTML = "🌙";
    }

});