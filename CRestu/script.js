let cart = [];

function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} - ${item.price} جنيه <button onclick="removeItem(${i})">حذف</button>`;
    cartItems.appendChild(div);
  });
  document.getElementById("totalPrice").innerText = `الإجمالي: ${total} جنيه`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const address = document.getElementById("customerAddress").value;
  const delivery = document.getElementById("deliveryType").value;

  if (!name || !phone || !address) {
    alert("من فضلك اكمل البيانات");
    return;
  }

  const invoice = document.getElementById("invoice");
  const table = document.getElementById("invoiceTable");
  table.innerHTML = "<tr><th>الصنف</th><th>السعر</th></tr>";

  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.name}</td><td>${item.price} جنيه</td>`;
    table.appendChild(row);
  });
  const rowTotal = document.createElement("tr");
  rowTotal.innerHTML = `<td>الإجمالي</td><td>${total} جنيه</td>`;
  table.appendChild(rowTotal);

  // QR code
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(
    document.getElementById("qrcode"),
    `العميل: ${name}, الهاتف: ${phone}, العنوان: ${address}, المجموع: ${total} جنيه`,
  );

  invoice.classList.remove("hidden");
  window.scrollTo({ top: invoice.offsetTop, behavior: "smooth" });
}
