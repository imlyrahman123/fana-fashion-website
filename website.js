// Add or increase product
function addToCart(productName, productPrice, imageURL = '') {
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: imageURL,
      quantity: 1
    });
  }
  saveCart();
  alert(`${productName} added to cart`);
}

// Get cart items
function getCartItems() {
  return cart;
}

// Increase quantity
function increaseItem(index) {
  cart[index].quantity++;
  saveCart();
  showCart();
}

// Decrease quantity
function decreaseItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1); // remove item
  }
  saveCart();
  showCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  showCart();
}

// Display cart (call this in cart.html)
function showCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  container.innerHTML = cart.map((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;">
        <span>${item.name}</span> - £${item.price.toFixed(2)}
        <button onclick="decreaseItem(${index})">−</button>
        <span>${item.quantity}</span>
        <button onclick="increaseItem(${index})">+</button>
        <button onclick="removeItem(${index})">Remove</button>
        <span style="margin-left: 10px;">Subtotal: £${subtotal.toFixed(2)}</span>
      </div>
    `;
  }).join("") + `<h3>Total: £${total.toFixed(2)}</h3>`;
}

// Cart preview dropdown
function showCartPreview() {
  const cartPreview = document.getElementById("cart-preview");
  if (!cartPreview) return;

  if (cart.length === 0) {
    cartPreview.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartPreview.innerHTML = `
      <h4>Cart Preview</h4>
      ${cart.map(item => `
        <div class="cart-preview-item">
          ${item.name} x ${item.quantity} - £${(item.price * item.quantity).toFixed(2)}
        </div>
      `).join("")}
      <a href="cart.html" class="checkout-btn">Checkout</a>
    `;
  }

  cartPreview.style.display = "block";
}

function hideCartPreview() {
  const cartPreview = document.getElementById("cart-preview");
  if (cartPreview) {
    cartPreview.style.display = "none";
  }
}

// Toggle logic for cart preview
document.addEventListener("DOMContentLoaded", () => {
  const cartLink = document.getElementById("cart-link");
  const cartPreview = document.getElementById("cart-preview");

  if (!cartLink || !cartPreview) return;

  function updateCartPreview() {
    if (cart.length === 0) {
      cartPreview.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartPreview.innerHTML = `
        <h4>Cart Preview</h4>
        ${cart.map(item => `
          <div class="cart-preview-item">
            ${item.name} x ${item.quantity} - £${(item.price * item.quantity).toFixed(2)}
          </div>
        `).join("")}
        <a href="cart.html" class="checkout-btn">Checkout</a>
      `;
    }
  }

  let isCartVisible = false;

  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    isCartVisible = !isCartVisible;

    if (isCartVisible) {
      updateCartPreview();
      cartPreview.style.display = "block";
    } else {
      cartPreview.style.display = "none";
    }
  });

  // Hide cart if clicked outside
  document.addEventListener("click", (e) => {
    if (!cartLink.contains(e.target) && !cartPreview.contains(e.target)) {
      cartPreview.style.display = "none";
      isCartVisible = false;
    }
  });
});
$('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    
