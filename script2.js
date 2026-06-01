const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');

typeFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);

function filterProducts() {
  const typeValue = typeFilter.value;
  const priceValue = priceFilter.value;

  const columns = document.querySelectorAll('.category-column');

  columns.forEach(column => {
    let anyVisible = false;

    const cards = column.querySelectorAll('.product-card');

    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      const cardPrice = parseInt(card.getAttribute('data-price'), 10);

      let typeMatch = typeValue === 'all' || typeValue === cardType;
      let priceMatch = true;

      if (priceValue === 'low') priceMatch = cardPrice < 500;
      else if (priceValue === 'medium') priceMatch = cardPrice >= 500 && cardPrice <= 1500;
      else if (priceValue === 'high') priceMatch = cardPrice > 1500;

      if (typeMatch && priceMatch) {
        card.style.display = 'block';
        anyVisible = true;
      } else {
        card.style.display = 'none';
      }
    });

    column.style.display = anyVisible ? 'flex' : 'none';
  });
}

/* =========================
   SEE MORE FIX (ONLY ONE BLOCK)
========================= */

document.addEventListener('DOMContentLoaded', () => {

  const columns = document.querySelectorAll('.category-column');
  const toggleBtn = document.getElementById('toggleSeeBtn');

  if (!toggleBtn) return;

  // initially hide extras
  columns.forEach(column => {
    const cards = column.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      if (index > 0) card.style.display = 'none';
    });
  });

  toggleBtn.addEventListener('click', () => {

    const isShowingLess = toggleBtn.textContent === 'See Less';

    columns.forEach(column => {
      const cards = column.querySelectorAll('.product-card');

      cards.forEach((card, index) => {
        if (index > 0) {
          card.style.display = isShowingLess ? 'none' : 'block';
        }
      });
    });

    toggleBtn.textContent = isShowingLess ? 'See More' : 'See Less';
  });

});

/* =========================
   CART SYSTEM
========================= */

const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const sendOrderBtn = document.getElementById('sendOrderBtn');

let cart = [];

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {

    const name = card.getAttribute('data-name') || 'Product';
    const price = parseInt(card.getAttribute('data-price'));

    if (!price) return;

    cart.push({ name, price });
    updateCart();

  });
});

function updateCart() {
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} ETB</span>
    `;

    cartItemsContainer.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = total;
}

/* =========================
   ORDER TEXT
========================= */

function getOrderText() {
  const phone = document.getElementById('phoneNumber')?.value || '';

  let list = '';
  cart.forEach(i => {
    list += `${i.name} - ${i.price} ETB\n`;
  });

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return `Phone: ${phone}

Orders:
${list}
Total: ${total} ETB`;
}
