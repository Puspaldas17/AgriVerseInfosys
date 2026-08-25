// ─────────────────────────────────────────────
//  AgriVerse Marketplace  –  marketplace.js
//  Fetches real listings from the Spring Boot
//  backend MongoDB database.
// ─────────────────────────────────────────────

const API_BASE = '/api/marketplace/listings';

let allListings = [];        // raw data from backend
let currentListings = [];    // filtered view
let activeCategory = 'All';

const categoryIcons = {
    'Grain': 'fa-wheat-awn',
    'Vegetable': 'fa-carrot',
    'Fruit': 'fa-apple-whole',
    'Spice': 'fa-pepper-hot',
    'Pulse': 'fa-seedling',
    'Other': 'fa-box'
};

function getIcon(category) {
    return categoryIcons[category] || 'fa-leaf';
}

/** Format LocalDateTime from backend to human-readable relative time */
function timeAgo(isoString) {
    if (!isoString) return 'Recently';
    const now = new Date();
    const past = new Date(isoString);
    const diffMs = now - past;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH} hour${diffH > 1 ? 's' : ''} ago`;
    const diffD = Math.floor(diffH / 24);
    return `${diffD} day${diffD > 1 ? 's' : ''} ago`;
}

// ─────────────────────────────────────────────
//  LOAD DATA FROM BACKEND
// ─────────────────────────────────────────────
async function loadListings() {
    const grid = document.getElementById('listingsGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:4rem; color:var(--text-muted)">
                <i class="fas fa-spinner fa-spin" style="font-size:2.5rem; color:var(--primary); margin-bottom:1rem;"></i>
                <p style="font-size:1.1rem; margin-top:1rem;">Loading marketplace listings...</p>
            </div>`;
    }

    try {
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error('Backend error: ' + res.status);
        allListings = await res.json();
        currentListings = [...allListings];
        filterListings();
    } catch (err) {
        console.error('Failed to load listings:', err);
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:4rem; color:var(--text-muted)">
                    <i class="fas fa-exclamation-triangle" style="font-size:3rem; color:#f59e0b; margin-bottom:1rem;"></i>
                    <h2 style="margin-bottom:0.5rem;">Could not load listings</h2>
                    <p>Make sure the backend server is running, then <a href="javascript:loadListings()" style="color:var(--primary)">try again</a>.</p>
                </div>`;
        }
    }
}

// ─────────────────────────────────────────────
//  RENDER LISTING CARDS
// ─────────────────────────────────────────────
function renderListings() {
    const grid = document.getElementById('listingsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (currentListings.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted)">
                <i class="fas fa-box-open" style="font-size:3rem; margin-bottom:1rem; color:#cbd5e1"></i>
                <h2>No listings found</h2>
                <p>Try adjusting your search or filters.</p>
            </div>`;
        document.getElementById('resultCount').textContent = '0 listings found';
        document.getElementById('organicCount').innerHTML = '<i class="fas fa-leaf"></i> 0 organic';
        return;
    }

    let organicTotal = 0;

    currentListings.forEach(item => {
        const isOrganic = item.description && item.description.toLowerCase().includes('organic');
        if (isOrganic) organicTotal++;

        const organicBadge = isOrganic
            ? '<div class="organic-badge"><i class="fas fa-check-circle"></i> Organic</div>'
            : '';

        const priceDisplay = item.price != null
            ? `₹${item.price} <span style="font-size:0.8rem;font-weight:600;color:var(--text-muted)">per ${item.unit || 'unit'}</span>`
            : 'Price on request';

        const quantityDisplay = item.quantity != null
            ? `${item.quantity} ${item.unit || ''}`
            : 'Contact for qty';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-top">
                <div class="crop-icon-wrapper" style="background:linear-gradient(135deg,var(--primary),#34d399);">
                    <i class="fas ${getIcon(item.category)}"></i>
                </div>
                ${organicBadge}
            </div>
            <h3 class="card-title">${item.title || 'Unnamed Crop'}</h3>
            <div class="card-seller"><i class="fas fa-user-circle"></i> ${item.farmerName || 'Farmer'}</div>
            <div class="card-price-box">
                <div>
                    <div class="price-label">Price</div>
                    <div class="card-price">${priceDisplay}</div>
                </div>
                <div class="card-quantity" style="text-align:right;">
                    <div class="price-label">Available</div>
                    <div>${quantityDisplay}</div>
                </div>
            </div>
            <div class="card-details">
                <div class="detail"><i class="fas fa-tag"></i> <span>${item.category || 'General'}</span></div>
                <div class="detail"><i class="fas fa-clock"></i> <span>${timeAgo(item.createdAt)}</span></div>
            </div>
            ${item.description ? `<p style="font-size:0.88rem;color:var(--text-muted);margin:0.5rem 0 1rem;line-height:1.5;">${item.description}</p>` : ''}
            <button class="btn-primary btn-full" onclick="openContactModal('${item.id}')">
                Contact Seller <i class="fas fa-arrow-right" style="margin-left:5px;font-size:0.85rem;"></i>
            </button>`;

        grid.appendChild(card);
    });

    document.getElementById('resultCount').textContent =
        currentListings.length + ' listing' + (currentListings.length !== 1 ? 's' : '') + ' found';
    document.getElementById('organicCount').innerHTML =
        '<i class="fas fa-leaf"></i> ' + organicTotal + ' organic';
}

window.renderListings = renderListings;

// ─────────────────────────────────────────────
//  FILTER
// ─────────────────────────────────────────────
function filterListings() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    const state = document.getElementById('stateSelect')?.value || 'All';

    currentListings = allListings.filter(item => {
        if (activeCategory !== 'All' && item.category !== activeCategory) return false;
        if (query) {
            const hit =
                (item.title || '').toLowerCase().includes(query) ||
                (item.farmerName || '').toLowerCase().includes(query) ||
                (item.description || '').toLowerCase().includes(query);
            if (!hit) return false;
        }
        return true;
    });

    renderListings();
}

// ─────────────────────────────────────────────
//  CONTACT MODAL
// ─────────────────────────────────────────────
let selectedListing = null;

window.openContactModal = function (listingId) {
    selectedListing = currentListings.find(item => item.id === listingId);
    if (!selectedListing) { alert('Seller details not found.'); return; }

    document.getElementById('modalSeller').textContent = selectedListing.farmerName || 'Farmer';
    document.getElementById('modalCrop').textContent =
        (selectedListing.title || '') + ' • ' + (selectedListing.category || '');
    document.getElementById('modalPhone').textContent = 'Contact via WhatsApp or call us';

    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        const msg = `Hello, I am interested in your listing: ${selectedListing.title} on AgriVerse.`;
        whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    }

    const upiBtn = document.getElementById('upiBtn');
    if (upiBtn) upiBtn.href = '#';

    document.getElementById('contactModal')?.classList.add('active');
};

window.closeContactModal = function () {
    document.getElementById('contactModal')?.classList.remove('active');
    selectedListing = null;
};

// ─────────────────────────────────────────────
//  POST LISTING MODAL (saves to DB)
// ─────────────────────────────────────────────
window.openPostModal = function () {
    document.getElementById('postModal')?.classList.add('active');
};

window.closePostModal = function () {
    document.getElementById('postModal')?.classList.remove('active');
};

window.submitListing = async function () {
    const title = document.getElementById('postCrop')?.value.trim();
    const category = document.getElementById('postCategory')?.value;
    const priceRaw = document.getElementById('postPrice')?.value.trim();
    const quantityRaw = document.getElementById('postQuantity')?.value.trim();
    const description = document.getElementById('postLocation')?.value.trim(); // location used as description/location
    const isOrganic = document.getElementById('postOrganic')?.checked;

    if (!title || !priceRaw || !quantityRaw) {
        alert('Please fill in all required fields.');
        return;
    }

    // Parse price — accept "₹2000" or "2000"
    const priceNum = parseFloat(priceRaw.replace(/[^0-9.]/g, '')) || 0;
    const quantityNum = parseFloat(quantityRaw.replace(/[^0-9.]/g, '')) || 0;
    const unit = quantityRaw.replace(/[0-9.]/g, '').trim() || 'kg';

    const farmerName = localStorage.getItem('userName') || 'Anonymous Farmer';
    const farmerId = localStorage.getItem('userId') || '';

    const payload = {
        farmerId,
        farmerName,
        title,
        description: (isOrganic ? '[Organic] ' : '') + (description || ''),
        price: priceNum,
        quantity: quantityNum,
        unit,
        category,
        status: 'PENDING'
    };

    try {
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('✅ Your listing has been submitted!\nIt will appear publicly once approved by an admin.');
            window.closePostModal();
            ['postCrop', 'postPrice', 'postLocation', 'postQuantity'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            const organic = document.getElementById('postOrganic');
            if (organic) organic.checked = false;
        } else {
            const err = await res.text();
            alert('Failed to submit listing: ' + err);
        }
    } catch (e) {
        alert('Network error. Please check the server is running.');
        console.error(e);
    }
};

// ─────────────────────────────────────────────
//  NAVBAR
// ─────────────────────────────────────────────
function initNavbar() {
    const token = localStorage.getItem('jwt_token');
    const navGuest = document.getElementById('nav-guest');
    const navUser = document.getElementById('nav-user');
    const avatarBtn = document.getElementById('avatarBtn');

    if (!navGuest || !navUser) return;

    if (token) {
        navGuest.style.display = 'none';
        navUser.style.display = 'flex';
        navUser.style.alignItems = 'center';
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const email = payload.sub || '';
            const initials = email.split('@')[0].substring(0, 2).toUpperCase();
            if (avatarBtn) { avatarBtn.textContent = initials; avatarBtn.title = email; }
        } catch (e) {
            if (avatarBtn) avatarBtn.textContent = 'ME';
        }
    } else {
        navGuest.style.display = 'flex';
        navUser.style.display = 'none';
    }
}

window.toggleUserMenu = function () {
    document.getElementById('userDropdown')?.classList.toggle('open');
};

window.logoutUser = function () {
    localStorage.removeItem('jwt_token');
    window.location.href = 'login.html';
};

// ─────────────────────────────────────────────
//  CLICK-OUTSIDE CLOSE
// ─────────────────────────────────────────────
window.addEventListener('click', e => {
    const contactModal = document.getElementById('contactModal');
    const postModal = document.getElementById('postModal');
    const dropdown = document.getElementById('userDropdown');
    const avatarBtn = document.getElementById('avatarBtn');

    if (contactModal && e.target === contactModal) window.closeContactModal();
    if (postModal && e.target === postModal) window.closePostModal();
    if (dropdown && dropdown.classList.contains('open')) {
        if (avatarBtn && !avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    }
});

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    loadListings();

    document.getElementById('searchInput')?.addEventListener('input', filterListings);
    document.getElementById('stateSelect')?.addEventListener('change', filterListings);

    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', e => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            activeCategory = e.currentTarget.getAttribute('data-cat');
            filterListings();
        });
    });
});