const API_URL = "https://your-api-url.com/orders"; // تقدر تغيره لاحقًا

const products = [
  {
    name: "كريب تشيكن",
    price: 60,
    category: "savory",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    name: "كريب لحمة",
    price: 70,
    category: "savory",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
  {
    name: "كريب نوتيلا",
    price: 50,
    category: "sweet",
    img: "https://images.unsplash.com/photo-1587732136271-0ecb8e4d8d7f",
  },
  {
    name: "كريب شوكولاتة",
    price: 45,
    category: "sweet",
    img: "https://images.unsplash.com/photo-1587732136271-0ecb8e4d8d7f",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderMenu() {
  const container = document.getElementById("menu-container");
  const search = document.getElementById("search").value.toLowerCase();
  const filter = document.getElementById("filter").value;

  container.innerHTML = "";

  products
    .filter(
      (p) =>
        (filter === "all" || p.category === filter) &&
        p.name.toLowerCase().includes(search),
    )
    .forEach((p) => {
      container.innerHTML += `
<div class="card">
<img src="${p.img}">
<div class="card-body">
<h4>${p.name}</h4>
<p>${p.price} جنيه</p>
<button onclick="addToCart('${p.name}',${p.price})">أضف للسلة</button>
</div>
</div>
`;
    });
}

function addToCart(name, price) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  toast("تمت الإضافة ✔");
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.reduce(
    (a, b) => a + b.qty,
    0,
  );

  let total = 0;
  const items = document.getElementById("cart-items");
  items.innerHTML = "";

  cart.forEach((i, index) => {
    total += i.price * i.qty;
    items.innerHTML += `
<p>${i.name} × ${i.qty} - ${i.price * i.qty} جنيه
<button onclick="removeItem(${index})">❌</button></p>
`;
  });

  document.getElementById("cart-total").innerText =
    "الإجمالي: " + total + " جنيه";
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("active");
}

function openCheckout() {
  document.getElementById("checkout-modal").style.display = "flex";
}

function closeCheckout() {
  document.getElementById("checkout-modal").style.display = "none";
}

function submitOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone) {
    alert("اكتب البيانات");
    return;
  }

  const orderData = { name, phone, address, cart };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  }).catch(() => {});

  toast("تم إرسال الطلب بنجاح 🎉");

  cart = [];
  localStorage.removeItem("cart");
  updateCart();
  closeCheckout();
}

function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

function toast(text) {
  const t = document.getElementById("toast");
  t.innerText = text;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2000);
}

renderMenu();
updateCart();
