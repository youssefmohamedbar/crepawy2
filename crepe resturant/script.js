let cart = JSON.parse(localStorage.getItem("cart")) || [];

function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

function addToCart(name, price) {
  const existing = cart.find((i) => i.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const div = document.getElementById("cartItems");
  const totalBox = document.getElementById("totalPrice");

  div.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    div.innerHTML += `
<p>
${item.name} × ${item.qty} = ${item.price * item.qty} جنيه
<button onclick="removeItem(${index})">❌</button>
</p>
`;
  });

  totalBox.innerText = "الإجمالي: " + total + " جنيه";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;
  const delivery = document.getElementById("deliveryType").value;

  if (!name || !phone) {
    alert("اكتب الاسم ورقم الهاتف");
    return;
  }

  let total = 0;
  const table = document.getElementById("invoiceTable");
  table.innerHTML = "<tr><th>الصنف</th><th>الكمية</th><th>السعر</th></tr>";

  cart.forEach((i) => {
    total += i.price * i.qty;
    table.innerHTML += `<tr><td>${i.name}</td><td>${i.qty}</td><td>${i.price * i.qty}</td></tr>`;
  });

  table.innerHTML += `<tr><td colspan="2">الإجمالي</td><td>${total}</td></tr>`;

  document.getElementById("invoice").classList.remove("hidden");

  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), {
    text: `العميل: ${name}
الهاتف: ${phone}
العنوان: ${address}
الإجمالي: ${total} جنيه`,
    width: 120,
    height: 120,
  });

  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}

renderCart();
