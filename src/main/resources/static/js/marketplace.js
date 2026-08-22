// Mock Data for the Marketplace
const mockListings = [
    {
        id: 1,
        title: "Soybean",
        category: "Pulse",
        isOrganic: false,
        price: "₹4500 per quintal",
        location: "Pune, Maharashtra",
        seller: "Ramesh Patil",
        quantity: "20 quintals",
        timePosted: "2 hours ago"
    },
    {
        id: 2,
        title: "Organic Tomatoes",
        category: "Vegetable",
        isOrganic: true,
        price: "₹30 per kg",
        location: "Nashik, Maharashtra",
        seller: "Kisan Fresh",
        quantity: "500 kg",
        timePosted: "5 hours ago"
    },
    {
        id: 3,
        title: "Alphonso Mangoes",
        category: "Fruit",
        isOrganic: true,
        price: "₹800 per dozen",
        location: "Ratnagiri, Maharashtra",
        seller: "Devgad Farms",
        quantity: "50 dozen",
        timePosted: "1 day ago"
    },
    {
        id: 4,
        title: "Turmeric (Raw)",
        category: "Spice",
        isOrganic: false,
        price: "₹7500 per quintal",
        location: "Erode, Tamil Nadu",
        seller: "Murugan Traders",
        quantity: "15 quintals",
        timePosted: "2 days ago"
    },
    {
        id: 5,
        title: "Wheat (Lokwan)",
        category: "Grain",
        isOrganic: true,
        price: "₹2800 per quintal",
        location: "Ludhiana, Punjab",
        seller: "Singh Agro",
        quantity: "100 quintals",
        timePosted: "3 days ago"
    },
    {
        id: 6,
        title: "Red Onion",
        category: "Vegetable",
        isOrganic: false,
        price: "₹20 per kg",
        location: "Ahmednagar, Maharashtra",
        seller: "Pravin K",
        quantity: "2000 kg",
        timePosted: "Just now"
    }
];

let currentListings = [...mockListings];
let activeCategory = "All";

// DOM Elements
const listingsGrid = document.getElementById('listingsGrid');
const searchInput = document.getElementById('searchInput');
const stateSelect = document.getElementById('stateSelect');
const categoryPills = document.querySelectorAll('.pill');
const resultCount = document.getElementById('resultCount');
const organicCount = document.getElementById('organicCount');
const contactModal = document.getElementById('contactModal');
const postModal = document.getElementById('postModal');

// Icons mapping for categories
const categoryIcons = {
    "Grain": "fa-wheat-awn",
    "Vegetable": "fa-carrot",
    "Fruit": "fa-apple-whole",
    "Spice": "fa-pepper-hot",
    "Pulse": "fa-seedling",
    "Other": "fa-box"
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderListings();
    
    // Search listener
    searchInput.addEventListener('input', filterListings);
    
    // State listener
    stateSelect.addEventListener('change', filterListings);
    
    // Category listeners
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            categoryPills.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            activeCategory = e.target.getAttribute('data-cat');
            filterListings();
        });
    });
});

function getIcon(category) {
    return categoryIcons[category] || "fa-leaf";
}

function renderListings() {
    listingsGrid.innerHTML = '';
    
    if (currentListings.length === 0) {
        listingsGrid.innerHTML = 
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; color: #cbd5e1;"></i>
                <h2>No listings found</h2>
                <p>Try adjusting your search or filters.</p>
            </div>
        ;
    }
    
    let organicTotal = 0;
    
    currentListings.forEach(item => {
        if (item.isOrganic) organicTotal++;
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = \
            <div class="card-header">
                <div class="crop-icon">
                    <i class="fas \" style="color:var(--primary-green);"></i>
                </div>
                \
            </div>
            <h3 class="card-title">\</h3>
            <div class="card-price">\</div>
            
            <div class="card-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>\</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-user"></i>
                    <span>\</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-weight-hanging"></i>
                    <span>\</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>\</span>
                </div>
            </div>
            
            <button class="btn btn-outline btn-block" onclick="openContactModal('\', '\')">
                Contact Seller
            </button>
        \;
        listingsGrid.appendChild(card);
    });
    
    resultCount.textContent = \\ listing\ found\;
    organicCount.innerHTML = \<i class="fas fa-leaf"></i> \ organic\;
}

// Attach these to window so inline HTML onclicks work
window.renderListings = renderListings;

function filterListings() {
    const query = searchInput.value.toLowerCase();
    const state = stateSelect.value;
    
    currentListings = mockListings.filter(item => {
        // Category Filter
        if (activeCategory !== "All" && item.category !== activeCategory) return false;
        
        // State Filter
        if (state !== "All" && !item.location.includes(state)) return false;
        
        // Search Filter
        if (query) {
            const matchTitle = item.title.toLowerCase().includes(query);
            const matchLocation = item.location.toLowerCase().includes(query);
            const matchSeller = item.seller.toLowerCase().includes(query);
            if (!matchTitle && !matchLocation && !matchSeller) return false;
        }
        
        return true;
    });
    
    renderListings();
}

// Modals Logic
window.openContactModal = function(sellerName, cropName) {
    document.getElementById('modalSellerName').textContent = sellerName;
    document.getElementById('modalCropInfo').textContent = \Interested in: \\;
    contactModal.classList.add('active');
}

window.closeContactModal = function() {
    contactModal.classList.remove('active');
}

window.sendContactMessage = function() {
    alert("Message sent successfully to the seller!");
    closeContactModal();
}

window.openPostModal = function() {
    postModal.classList.add('active');
}

window.closePostModal = function() {
    postModal.classList.remove('active');
}

window.submitListing = function() {
    const title = document.getElementById('postCrop').value;
    const category = document.getElementById('postCategory').value;
    const price = document.getElementById('postPrice').value;
    const location = document.getElementById('postLocation').value;
    const quantity = document.getElementById('postQuantity').value;
    const isOrganic = document.getElementById('postOrganic').checked;
    
    if (!title || !price || !location || !quantity) {
        alert("Please fill all details.");
        return;
    }
    
    const newListing = {
        id: mockListings.length + 1,
        title,
        category,
        price,
        location,
        seller: "You (Farmer)",
        quantity,
        isOrganic,
        timePosted: "Just now"
    };
    
    mockListings.unshift(newListing);
    filterListings();
    closePostModal();
    
    // Clear form
    document.getElementById('postCrop').value = '';
    document.getElementById('postPrice').value = '';
    document.getElementById('postLocation').value = '';
    document.getElementById('postQuantity').value = '';
    document.getElementById('postOrganic').checked = false;
    
    alert("Listing posted successfully!");
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === contactModal) closeContactModal();
    if (event.target === postModal) closePostModal();
}
