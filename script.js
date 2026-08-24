/* =========================
   CURSOR GLOW
========================= */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});


/* =========================
   CART SYSTEM
========================= */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


cartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("active");
});


closeCart.addEventListener("click", () => {
  cartOverlay.classList.remove("active");
});


cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) {
    cartOverlay.classList.remove("active");
  }
});


/* =========================
   ADD PRODUCT
========================= */

document.querySelectorAll(".quick-add").forEach(button => {

  button.addEventListener("click", () => {

    const card = button.closest(".product-card");

    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        name,
        price,
        quantity: 1
      });
    }

    updateCart();

    cartOverlay.classList.add("active");

  });

});


/* =========================
   UPDATE CART
========================= */

function updateCart() {

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty 🍓
      </p>
    `;

  } else {

    cart.forEach((item, index) => {

      const element = document.createElement("div");

      element.className = "cart-item";

      element.innerHTML = `
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>
            ${item.quantity} × ${formatPrice(item.price)}
          </span>
        </div>

        <button
          class="remove-item"
          data-index="${index}"
        >
          Remove
        </button>
      `;

      cartItems.appendChild(element);

    });

  }


  /* COUNT */

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = count;


  /* TOTAL */

  const total = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  cartTotal.textContent = formatPrice(total);


  /* REMOVE */

  document.querySelectorAll(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();

    });

  });

}


/* =========================
   PRICE
========================= */

function formatPrice(price) {

  return (
    new Intl.NumberFormat("vi-VN").format(price / 1000)
    + "K"
  );

}


/* =========================
   ORDER BUTTON
========================= */

document.getElementById("orderBtn")
  .addEventListener("click", () => {

    cartOverlay.classList.add("active");

  });


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {

  const nav = document.querySelector("nav");

  if (nav.style.display === "flex") {

    nav.style.display = "";

  } else {

    nav.style.display = "flex";

    nav.style.position = "absolute";
    nav.style.top = "80px";
    nav.style.left = "0";
    nav.style.right = "0";

    nav.style.padding = "25px";

    nav.style.background = "#f8f7f2";

    nav.style.flexDirection = "column";

    nav.style.gap = "20px";

  }

});


/* =========================
   REVEAL ANIMATION
========================= */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: 0.15
  }
);


document
  .querySelectorAll(".product-card, .story-content, .story-image")
  .forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition =
      "opacity .8s ease, transform .8s ease";

    observer.observe(element);

  });


/* =========================
   CARD TILT EFFECT
========================= */

document.querySelectorAll(".product-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -6;

    const rotateY =
      ((x / rect.width) - 0.5) * 6;

    card.style.transform =
      `translateY(-10px)
       perspective(800px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});
