const cartItemsContainer = document.getElementById("cart-items");

//اینجا واسه کوانتیتی و تعداده یادت نرع
function normalizeCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map(item => {
    if (typeof item.quantity !== "number" || item.quantity < 1) {
      item.quantity = 1;
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

function renderCartItems() {
  const cart = normalizeCart();
  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;

    const cartItemHTML = `
      <div class="cart-item w-full h-40 bg-white rounded-3xl flex justify-between items-center px-3" data-index="${index}">
        <div class="w-32 h-32 rounded-3xl bg-gray-200 overflow-hidden">
          <img class="rounded-3xl w-full h-full object-cover" src="${item.imageURL}" alt="${item.name}" />
        </div>
        <div class="w-56 h-32">
          <div class="flex justify-between items-start">
            <p class="text-black font-bold text-base">${item.name}</p>
            <button class="delete-btn" aria-label="Remove item">
              <img src="public/assets/delete_30dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="delete">
            </button>
          </div>
          <div class="flex mx-3 mt-5 items-center">
            <div class="w-5 h-5 bg-black rounded-full"></div>
            <p class="text-xs text-gray-500 font-medium ml-2">Color | Size</p>
          </div>
          <div class="mt-6 w-full ml-3 flex justify-around">
            <p class="text-black font-bold text-lg">$${(item.price * quantity).toFixed(2)}</p>
            <div class="w-20 h-7 bg-gray-200 rounded-2xl flex items-center justify-around">
              <button class="decrease-btn" aria-label="Decrease quantity">
                <img class="w-4" src="public/assets/remove_25dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="-" />
              </button>
              <p>${quantity}</p>
              <button class="increase-btn" aria-label="Increase quantity">
                <img class="w-4" src="public/assets/add_25dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="+" />
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    cartItemsContainer.innerHTML += cartItemHTML;
  });
}

// 
cartItemsContainer.addEventListener("click", function (event) {
  const cartItemEl = event.target.closest(".cart-item");
  if (!cartItemEl) return;

  const index = parseInt(cartItemEl.dataset.index);
  let cart = normalizeCart();

  if (event.target.closest(".delete-btn")) {
    cart.splice(index, 1);
  } else if (event.target.closest(".increase-btn")) {
    cart[index].quantity += 1;
  } else if (event.target.closest(".decrease-btn")) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1); 
    }
  } else {
    return; 
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
});


renderCartItems();

function addToCart(product) {
  const cart = normalizeCart();
  const existingIndex = cart.findIndex(p => p.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}



