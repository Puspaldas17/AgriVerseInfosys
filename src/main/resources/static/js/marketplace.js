const mockListings=[
{id:1,title:"Soybean",category:"Pulse",isOrganic:false,price:"₹4500 per quintal",location:"Pune, Maharashtra",seller:"Ramesh Patil",phone:"9876543210",upi:"ramesh@upi",quantity:"20 quintals",timePosted:"2 hours ago"},
{id:2,title:"Organic Tomatoes",category:"Vegetable",isOrganic:true,price:"₹30 per kg",location:"Nashik, Maharashtra",seller:"Kisan Fresh",phone:"9876543211",upi:"kisanfresh@upi",quantity:"500 kg",timePosted:"5 hours ago"},
{id:3,title:"Alphonso Mangoes",category:"Fruit",isOrganic:true,price:"₹800 per dozen",location:"Ratnagiri, Maharashtra",seller:"Devgad Farms",phone:"9876543212",upi:"devgadfarms@upi",quantity:"50 dozen",timePosted:"1 day ago"},
{id:4,title:"Turmeric (Raw)",category:"Spice",isOrganic:false,price:"₹7500 per quintal",location:"Erode, Tamil Nadu",seller:"Murugan Traders",phone:"9876543213",upi:"murugantraders@upi",quantity:"15 quintals",timePosted:"2 days ago"},
{id:5,title:"Wheat (Lokwan)",category:"Grain",isOrganic:true,price:"₹2800 per quintal",location:"Ludhiana, Punjab",seller:"Singh Agro",phone:"9876543214",upi:"singhagro@upi",quantity:"100 quintals",timePosted:"3 days ago"},
{id:6,title:"Red Onion",category:"Vegetable",isOrganic:false,price:"₹20 per kg",location:"Ahmednagar, Maharashtra",seller:"Pravin K",phone:"9876543215",upi:"pravink@upi",quantity:"2000 kg",timePosted:"Just now"},
{id:7,title:"Basmati Rice",category:"Grain",isOrganic:true,price:"₹6000 per quintal",location:"Amritsar, Punjab",seller:"Gurpreet Farms",phone:"9876543216",upi:"gurpreetfarms@upi",quantity:"50 quintals",timePosted:"4 hours ago"},
{id:8,title:"Green Chilli",category:"Spice",isOrganic:false,price:"₹45 per kg",location:"Guntur, Andhra Pradesh",seller:"Andhra Agro",phone:"9876543217",upi:"andhraagro@upi",quantity:"800 kg",timePosted:"6 hours ago"},
{id:9,title:"Pomegranate",category:"Fruit",isOrganic:true,price:"₹120 per kg",location:"Solapur, Maharashtra",seller:"Ruby Farms",phone:"9876543218",upi:"rubyfarms@upi",quantity:"300 kg",timePosted:"1 hour ago"},
{id:10,title:"Toor Dal",category:"Pulse",isOrganic:false,price:"₹9500 per quintal",location:"Gulbarga, Karnataka",seller:"K Trader",phone:"9876543219",upi:"ktrader@upi",quantity:"40 quintals",timePosted:"12 hours ago"}
];

let currentListings=[...mockListings];
let activeCategory="All";

const categoryIcons={
"Grain":"fa-wheat-awn",
"Vegetable":"fa-carrot",
"Fruit":"fa-apple-whole",
"Spice":"fa-pepper-hot",
"Pulse":"fa-seedling",
"Other":"fa-box"
};

function getIcon(category){
return categoryIcons[category]||"fa-leaf";
}

document.addEventListener("DOMContentLoaded",()=>{
initNavbar();
renderListings();

const searchInput=document.getElementById("searchInput");
if(searchInput)searchInput.addEventListener("input",filterListings);

const stateSelect=document.getElementById("stateSelect");
if(stateSelect)stateSelect.addEventListener("change",filterListings);

document.querySelectorAll(".pill").forEach(pill=>{
pill.addEventListener("click",e=>{
document.querySelectorAll(".pill").forEach(p=>p.classList.remove("active"));
e.currentTarget.classList.add("active");
activeCategory=e.currentTarget.getAttribute("data-cat");
filterListings();
});
});
});

function renderListings(){
const grid=document.getElementById("listingsGrid");
if(!grid)return;
grid.innerHTML="";

if(currentListings.length===0){
grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)"><i class="fas fa-box-open" style="font-size:3rem;margin-bottom:1rem;color:#cbd5e1"></i><h2>No listings found</h2><p>Try adjusting your search or filters.</p></div>';
document.getElementById("resultCount").textContent="0 listings found";
document.getElementById("organicCount").innerHTML='<i class="fas fa-leaf"></i> 0 organic';
return;
}

let organicTotal=0;

currentListings.forEach(item=>{
if(item.isOrganic)organicTotal++;

const organicBadge=item.isOrganic?'<div class="organic-badge"><i class="fas fa-check-circle"></i> Organic</div>':"";

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<div class="card-top">
<div class="crop-icon-wrapper" style="background:linear-gradient(135deg,var(--primary),#34d399);">
<i class="fas ${getIcon(item.category)}"></i>
</div>
${organicBadge}
</div>
<h3 class="card-title">${item.title}</h3>
<div class="card-seller"><i class="fas fa-user-circle"></i> ${item.seller}</div>
<div class="card-price-box">
<div>
<div class="price-label">Price</div>
<div class="card-price">${item.price.split(" ")[0]} <span style="font-size:0.8rem;font-weight:600;color:var(--text-muted)">${item.price.split(" ").slice(1).join(" ")}</span></div>
</div>
<div class="card-quantity" style="text-align:right;">
<div class="price-label">Available</div>
<div>${item.quantity}</div>
</div>
</div>
<div class="card-details">
<div class="detail"><i class="fas fa-map-marker-alt"></i> <span>${item.location}</span></div>
<div class="detail"><i class="fas fa-clock"></i> <span>${item.timePosted}</span></div>
</div>
<button class="btn-primary btn-full" onclick="openContactModal('${item.id}')">Contact Seller <i class="fas fa-arrow-right" style="margin-left:5px;font-size:0.85rem;"></i></button>
`;

grid.appendChild(card);
});

document.getElementById("resultCount").textContent=currentListings.length+" listing"+(currentListings.length!==1?"s":"")+" found";
document.getElementById("organicCount").innerHTML='<i class="fas fa-leaf"></i> '+organicTotal+" organic";
}

window.renderListings=renderListings;

function filterListings(){
const searchElement=document.getElementById("searchInput");
const stateElement=document.getElementById("stateSelect");

const query=searchElement?searchElement.value.toLowerCase().trim():"";
const state=stateElement?stateElement.value:"All";

currentListings=mockListings.filter(item=>{
if(activeCategory!=="All"&&item.category!==activeCategory)return false;
if(state!=="All"&&!item.location.includes(state))return false;

if(query){
const hit=item.title.toLowerCase().includes(query)||item.location.toLowerCase().includes(query)||item.seller.toLowerCase().includes(query);
if(!hit)return false;
}

return true;
});

renderListings();
}

let selectedListing=null;

window.openContactModal=function(listingId){
selectedListing=currentListings.find(item=>item.id==listingId);
if(!selectedListing){
alert("Seller details not found.");
return;
}
const sellerElement=document.getElementById("modalSeller");
if(sellerElement)sellerElement.textContent=selectedListing.seller;
const cropElement=document.getElementById("modalCrop");
if(cropElement)cropElement.textContent=selectedListing.title+" • "+selectedListing.location;
const phoneElement=document.getElementById("modalPhone");
if(phoneElement)phoneElement.textContent=selectedListing.phone||"Phone number not available";
const whatsappButton=document.getElementById("whatsappBtn");
if(whatsappButton&&selectedListing.phone){
let phone=selectedListing.phone.replace(/\D/g,"");
if(phone.length===10)phone="91"+phone;
const message="Hello "+selectedListing.seller+", I am interested in your "+selectedListing.title+".";
whatsappButton.href="https://wa.me/"+phone+"?text="+encodeURIComponent(message);
whatsappButton.style.display="block";
}
const upiButton=document.getElementById("upiBtn");
if(upiButton&&selectedListing.upi){
upiButton.href="upi://pay?pa="+encodeURIComponent(selectedListing.upi)+"&pn="+encodeURIComponent(selectedListing.seller)+"&cu=INR";
upiButton.style.display="block";
}
const buyerName=localStorage.getItem("userName")||"Guest";
const buyerPhone=localStorage.getItem("userPhone")||"";
const contactRequest={
listingId:String(selectedListing.id),
farmerId:String(selectedListing.id),
farmerName:selectedListing.seller,
buyerName:buyerName,
buyerPhone:buyerPhone,
buyerMessage:"I am interested in your "+selectedListing.title
};
fetch("/api/contact",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(contactRequest)
})
.then(response=>{
if(!response.ok)throw new Error("Failed to save contact request");
return response.json();
})
.then(data=>{
console.log("Contact request saved:",data);
})
.catch(error=>{
console.error("Contact request error:",error);
});
const modal=document.getElementById("contactModal");
if(modal)modal.classList.add("active");
};

window.closeContactModal=function(){
const modal=document.getElementById("contactModal");
if(modal)modal.classList.remove("active");
selectedListing=null;
};

window.openPostModal=function(){
const modal=document.getElementById("postModal");
if(modal)modal.classList.add("active");
};

window.closePostModal=function(){
const modal=document.getElementById("postModal");
if(modal)modal.classList.remove("active");
};

window.submitListing=function(){
const titleElement=document.getElementById("postCrop");
const categoryElement=document.getElementById("postCategory");
const priceElement=document.getElementById("postPrice");
const locationElement=document.getElementById("postLocation");
const quantityElement=document.getElementById("postQuantity");
const organicElement=document.getElementById("postOrganic");

const title=titleElement.value.trim();
const category=categoryElement.value;
const price=priceElement.value.trim();
const location=locationElement.value.trim();
const quantity=quantityElement.value.trim();
const isOrganic=organicElement.checked;

if(!title||!price||!location||!quantity){
alert("Please fill in all fields.");
return;
}

mockListings.unshift({
id:Date.now(),
title:title,
category:category,
price:price,
location:location,
quantity:quantity,
isOrganic:isOrganic,
seller:"You (Farmer)",
phone:"",
upi:"",
timePosted:"Just now"
});

filterListings();
window.closePostModal();

["postCrop","postPrice","postLocation","postQuantity"].forEach(id=>{
document.getElementById(id).value="";
});

document.getElementById("postOrganic").checked=false;

alert("Listing posted successfully!");
};

window.addEventListener("click",function(event){
const contactModal=document.getElementById("contactModal");
const postModal=document.getElementById("postModal");
const dropdown=document.getElementById("userDropdown");
const avatarBtn=document.getElementById("avatarBtn");

if(contactModal&&event.target===contactModal)window.closeContactModal();
if(postModal&&event.target===postModal)window.closePostModal();

if(dropdown&&dropdown.classList.contains("open")){
if(avatarBtn&&!avatarBtn.contains(event.target)&&!dropdown.contains(event.target)){
dropdown.classList.remove("open");
}
}
});

function initNavbar(){
const token=localStorage.getItem("jwt_token");
const navGuest=document.getElementById("nav-guest");
const navUser=document.getElementById("nav-user");
const avatarBtn=document.getElementById("avatarBtn");

if(!navGuest||!navUser)return;

if(token){
navGuest.style.display="none";
navUser.style.display="flex";
navUser.style.alignItems="center";

try{
const payload=JSON.parse(atob(token.split(".")[1]));
const email=payload.sub||"";
const namePart=email.split("@")[0];
const initials=namePart.substring(0,2).toUpperCase();

if(avatarBtn){
avatarBtn.textContent=initials;
avatarBtn.title=email;
}
}catch(e){
if(avatarBtn)avatarBtn.textContent="ME";
}
}else{
navGuest.style.display="flex";
navUser.style.display="none";
}
}

window.toggleUserMenu=function(){
const dropdown=document.getElementById("userDropdown");
if(dropdown)dropdown.classList.toggle("open");
};

window.logoutUser=function(){
localStorage.removeItem("jwt_token");
window.location.href="login.html";
};