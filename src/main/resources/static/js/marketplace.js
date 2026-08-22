// ============================================================
// FarmVerse — Farmer Marketplace JavaScript
// Handles: mock data, card rendering, search/filter, modals,
//           auth-aware navbar (reads jwt_token from localStorage)
// ============================================================

// --------------- MOCK DATA ---------------
const mockListings = [
    { id: 1, title: "Soybean",          category: "Pulse",     isOrganic: false, price: "₹4500 per quintal", location: "Pune, Maharashtra",       seller: "Ramesh Patil",   quantity: "20 quintals",  timePosted: "2 hours ago" },
    { id: 2, title: "Organic Tomatoes", category: "Vegetable", isOrganic: true,  price: "₹30 per kg",        location: "Nashik, Maharashtra",      seller: "Kisan Fresh",    quantity: "500 kg",        timePosted: "5 hours ago" },
    { id: 3, title: "Alphonso Mangoes", category: "Fruit",     isOrganic: true,  price: "₹800 per dozen",    location: "Ratnagiri, Maharashtra",   seller: "Devgad Farms",   quantity: "50 dozen",      timePosted: "1 day ago"   },
    { id: 4, title: "Turmeric (Raw)",   category: "Spice",     isOrganic: false, price: "₹7500 per quintal", location: "Erode, Tamil Nadu",         seller: "Murugan Traders",quantity: "15 quintals",  timePosted: "2 days ago"  },
    { id: 5, title: "Wheat (Lokwan)",   category: "Grain",     isOrganic: true,  price: "₹2800 per quintal", location: "Ludhiana, Punjab",          seller: "Singh Agro",     quantity: "100 quintals", timePosted: "3 days ago"  },
    { id: 6, title: "Red Onion",        category: "Vegetable", isOrganic: false, price: "₹20 per kg",        location: "Ahmednagar, Maharashtra",   seller: "Pravin K",       quantity: "2000 kg",       timePosted: "Just now"    },
    { id: 7, title: "Basmati Rice",     category: "Grain",     isOrganic: true,  price: "₹6000 per quintal", location: "Amritsar, Punjab",          seller: "Gurpreet Farms", quantity: "50 quintals",  timePosted: "4 hours ago" },
    { id: 8, title: "Green Chilli",     category: "Spice",     isOrganic: false, price: "₹45 per kg",        location: "Guntur, Andhra Pradesh",    seller: "Andhra Agro",    quantity: "800 kg",        timePosted: "6 hours ago" },
    { id: 9, title: "Pomegranate",      category: "Fruit",     isOrganic: true,  price: "₹120 per kg",       location: "Solapur, Maharashtra",      seller: "Ruby Farms",     quantity: "300 kg",        timePosted: "1 hour ago"  },
    { id:10, title: "Toor Dal",         category: "Pulse",     isOrganic: false, price: "₹9500 per quintal", location: "Gulbarga, Karnataka",       seller: "K Trader",       quantity: "40 quintals",  timePosted: "12 hours ago"}
];

let currentListings = [...mockListings];
let activeCategory = "All";

// --------------- ICON MAP ---------------
const categoryIcons = {
    "Grain":     "fa-wheat-awn",
    "Vegetable": "fa-carrot",
    "Fruit":     "fa-apple-whole",
    "Spice":     "fa-pepper-hot",
    "Pulse":     "fa-seedling",
    "Other":     "fa-box"
};

function getIcon(category) {
    return categoryIcons[category] || "fa-leaf";
}

// --------------- DOM READY ---------------
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    renderListings();

    document.getElementById('searchInput').addEventListener('input', filterListings);
    document.getElementById('stateSelect').addEventListener('change', filterListings);

    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            activeCategory = e.currentTarget.getAttribute('data-cat');
            filterListings();
        });
    });
});

// --------------- RENDER CARDS ---------------
function renderListings() {
    const grid = document.getElementById('listingsGrid');
    grid.innerHTML = '';

    if (currentListings.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)"><i class="fas fa-box-open" style="font-size:3rem;margin-bottom:1rem;color:#cbd5e1"></i><h2>No listings found</h2><p>Try adjusting your search or filters.</p></div>';
        document.getElementById('resultCount').textContent = '0 listings found';
        document.getElementById('organicCount').innerHTML = '<i class="fas fa-leaf"></i> 0 organic';
        return;
    }

    let organicTotal = 0;
    currentListings.forEach(item => {
        if (item.isOrganic) organicTotal++;

        const organicBadge = item.isOrganic
            ? '<div class="organic-tag"><i class="fas fa-check-circle"></i> Organic</div>'
            : '';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = [
            '<div class="card-header">',
            '  <div class="crop-icon"><i class="fas ' + getIcon(item.category) + '" style="color:var(--primary-green)"></i></div>',
            organicBadge,
            '</div>',
            '<h3 class="card-title">' + item.title + '</h3>',
            '<div class="card-price">' + item.price + '</div>',
            '<div class="card-details">',
            '  <div class="detail-item"><i class="fas fa-map-marker-alt"></i><span>' + item.location + '</span></div>',
            '  <div class="detail-item"><i class="fas fa-user"></i><span>' + item.seller + '</span></div>',
            '  <div class="detail-item"><i class="fas fa-weight-hanging"></i><span>' + item.quantity + '</span></div>',
            '  <div class="detail-item"><i class="fas fa-clock"></i><span>' + item.timePosted + '</span></div>',
            '</div>',
            '<button class="btn btn-outline btn-block" onclick="openContactModal(\'' + item.seller.replace(/'/g,"&#39;") + '\',\'' + item.title.replace(/'/g,"&#39;") + '\')">Contact Seller</button>'
        ].join('');
        grid.appendChild(card);
    });

    document.getElementById('resultCount').textContent = currentListings.length + ' listing' + (currentListings.length !== 1 ? 's' : '') + ' found';
    document.getElementById('organicCount').innerHTML = '<i class="fas fa-leaf"></i> ' + organicTotal + ' organic';
}

window.renderListings = renderListings;

// --------------- FILTER ---------------
function filterListings() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const state = document.getElementById('stateSelect').value;

    currentListings = mockListings.filter(item => {
        if (activeCategory !== 'All' && item.category !== activeCategory) return false;
        if (state !== 'All' && !item.location.includes(state)) return false;
        if (query) {
            const hit = item.title.toLowerCase().includes(query)
                     || item.location.toLowerCase().includes(query)
                     || item.seller.toLowerCase().includes(query);
            if (!hit) return false;
        }
        return true;
    });

    renderListings();
}

// --------------- CONTACT MODAL ---------------
window.openContactModal = function(sellerName, cropName) {
    document.getElementById('modalSellerName').textContent = sellerName;
    document.getElementById('modalCropInfo').textContent = 'Interested in: ' + cropName;
    document.getElementById('contactModal').classList.add('active');
};

window.closeContactModal = function() {
    document.getElementById('contactModal').classList.remove('active');
};

window.sendContactMessage = function() {
    alert('Message sent successfully to the seller!');
    window.closeContactModal();
};

// --------------- POST LISTING MODAL ---------------
window.openPostModal = function() {
    document.getElementById('postModal').classList.add('active');
};

window.closePostModal = function() {
    document.getElementById('postModal').classList.remove('active');
};

window.submitListing = function() {
    const title    = document.getElementById('postCrop').value.trim();
    const category = document.getElementById('postCategory').value;
    const price    = document.getElementById('postPrice').value.trim();
    const location = document.getElementById('postLocation').value.trim();
    const quantity = document.getElementById('postQuantity').value.trim();
    const isOrganic = document.getElementById('postOrganic').checked;

    if (!title || !price || !location || !quantity) {
        alert('Please fill in all fields.');
        return;
    }

    mockListings.unshift({ id: Date.now(), title, category, price, location, quantity, isOrganic, seller: 'You (Farmer)', timePosted: 'Just now' });
    filterListings();
    window.closePostModal();

    ['postCrop','postPrice','postLocation','postQuantity'].forEach(id => { document.getElementById(id).value = ''; });
    document.getElementById('postOrganic').checked = false;

    alert('Listing posted successfully!');
};

// --------------- CLICK OUTSIDE → CLOSE MODALS / DROPDOWN ---------------
window.addEventListener('click', function(event) {
    var contactModal = document.getElementById('contactModal');
    var postModal    = document.getElementById('postModal');
    var dropdown     = document.getElementById('userDropdown');
    var avatarBtn    = document.getElementById('avatarBtn');

    if (event.target === contactModal) window.closeContactModal();
    if (event.target === postModal)    window.closePostModal();

    if (dropdown && dropdown.classList.contains('open')) {
        if (avatarBtn && !avatarBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('open');
        }
    }
});

// --------------- AUTH-AWARE NAVBAR ---------------
// Reads 'jwt_token' — same key written by login.html & read by dashboard.js
function initNavbar() {
    var token    = localStorage.getItem('jwt_token');
    var navGuest = document.getElementById('nav-guest');
    var navUser  = document.getElementById('nav-user');
    var avatarBtn = document.getElementById('avatarBtn');

    if (!navGuest || !navUser) return;

    if (token) {
        navGuest.style.display = 'none';
        navUser.style.display  = 'flex';
        navUser.style.alignItems = 'center';

        // Decode JWT to get email from 'sub' claim
        try {
            var payload  = JSON.parse(atob(token.split('.')[1]));
            var email    = payload.sub || '';
            var namePart = email.split('@')[0];
            var initials = namePart.substring(0, 2).toUpperCase();
            if (avatarBtn) { avatarBtn.textContent = initials; avatarBtn.title = email; }
        } catch (e) {
            if (avatarBtn) avatarBtn.textContent = 'ME';
        }
    } else {
        navGuest.style.display = 'flex';
        navUser.style.display  = 'none';
    }
}

window.toggleUserMenu = function() {
    var dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('open');
};

window.logoutUser = function() {
    localStorage.removeItem('jwt_token');
    window.location.href = 'login.html';
};