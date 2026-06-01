
/* =========================
   FILTER SYSTEM (FIXED SAFE)
========================= */

const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');

typeFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

function filterProducts() {

  const typeValue = typeFilter.value;
  const priceValue = priceFilter.value;

  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {

    const type = card.getAttribute('data-type');
    const price = parseInt(card.getAttribute('data-price'));

    let typeMatch = (typeValue === 'all' || typeValue === type);

    let priceMatch = true;
    if (priceValue === 'low') priceMatch = price < 500;
    else if (priceValue === 'medium') priceMatch = price >= 500 && price <= 1500;
    else if (priceValue === 'high') priceMatch = price > 1500;

    if (typeMatch && priceMatch) {
      card.dataset.filtered = "true";
    } else {
      card.dataset.filtered = "false";
    }

    applyVisibility(card);
  });
}


/* =========================
   SEE MORE / SEE LESS (FIXED)
========================= */

document.addEventListener('DOMContentLoaded', () => {

    const columns = document.querySelectorAll('.category-column');
    const toggleBtn = document.getElementById('toggleSeeBtn');

    if (!toggleBtn) return;

    // Start with extras hidden
    document.querySelectorAll('.extra').forEach(card => {
        card.style.display = 'none';
    });

    toggleBtn.textContent = 'See More';

    toggleBtn.addEventListener('click', () => {

        const expanded = toggleBtn.textContent === 'See Less';

        document.querySelectorAll('.extra').forEach(card => {
            card.style.display = '';
        });

        toggleBtn.textContent = expanded ? 'See More' : 'See Less';

    });

});


/* =========================
   VISIBILITY ENGINE (CORE FIX)
========================= */

function applyVisibility(card) {

  const filtered = card.dataset.filtered !== "false";
  const expanded = card.classList.contains('extra')
    ? card.dataset.expanded === "true"
    : true;

  if (filtered && expanded !== false) {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }
}


/* =========================
   ADD TO CART SYSTEM (FIXED)
========================= */

const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = [];

/* ADD BUTTON SUPPORT (NEW SAFE WAY) */
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  const sidebar = document.getElementById("cartSidebar");

if (!sidebar.classList.contains("open")) {
    toggleCart();
}
}


/* =========================
   VIEW IMAGE (NEW)
========================= */

function viewImage(src){
  window.open(src, "_blank");
}


/* =========================
   CART UI UPDATE
========================= */

function updateCart(){

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    
div.innerHTML = `
  <span>${item.name}</span>
  <span>${item.price} ETB</span>
  <button class="remove-item" onclick="removeFromCart(${index})">✖</button>
`;
    cartItemsContainer.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = total;
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
/* ================= CART SIDEBAR TOGGLE ================= */


function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const btn = document.querySelector(".cart-open-btn");

  sidebar.classList.toggle("open");

  if (sidebar.classList.contains("open")) {
    btn.textContent = "✖ Hide Cart";
  } else {
    btn.textContent = " Cart";
  }
}
document.querySelectorAll('.product-card').forEach(card => {

    card.addEventListener('click', function(e){

        // Don't reopen when clicking the buttons themselves
        if (
            e.target.classList.contains('add-cart-btn') ||
            e.target.classList.contains('view-image-btn')
        ) {
            return;
        }

        // Close all other cards
        document.querySelectorAll('.product-card').forEach(c => {
            if(c !== this){
                c.classList.remove('active');
            }
        });

        // Open/close this card
        this.classList.toggle('active');

    });

});