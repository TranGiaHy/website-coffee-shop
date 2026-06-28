function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tbody = document.getElementById("cart-body");
  if (!tbody) return;

  if (cart.length === 0) {
    document.getElementById("cart-empty").style.display = "block";
    document.getElementById("cart-table").style.display = "none";
    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("cart-total").innerText = "0 đ";
    return;
  }

  let total = 0;
  tbody.innerHTML = "";
  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    tbody.innerHTML += `
            <tr>
                <td><img src="../${item.img}" width="50" style="vertical-align: middle; margin-right: 10px;"> ${item.name}</td>
                <td>${item.price.toLocaleString("vi-VN")} đ</td>
                <td>
                    <button style="padding: 2px 8px;" onclick="changeQty(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" style="width: 40px; text-align: center;" readonly>
                    <button style="padding: 2px 8px;" onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td style="font-weight: bold;">${itemTotal.toLocaleString("vi-VN")} đ</td>
                <td><button class="btn-danger" onclick="removeItem(${index})">Xóa</button></td>
            </tr>
        `;
  });
  document.getElementById("cart-total").innerText =
    total.toLocaleString("vi-VN") + " đ";
}

function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let products = JSON.parse(localStorage.getItem("products"));
  let item = cart[index];
  let product = products.find(p => p.id === item.id);

  // Kiểm tra nếu tăng số lượng thì phải bé hơn hoặc bằng tồn kho
  if (delta > 0 && item.quantity >= product.stock) {
    alert("Xin lỗi, sản phẩm này chỉ còn " + product.stock + " sản phẩm!");
    return;
  }

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Bắt đầu xử lý khi click "Xác nhận thanh toán"
function processCheckout() {
  let name = document.getElementById("cus-name").value;
  let phone = document.getElementById("cus-phone").value;
  let addr = document.getElementById("cus-address").value;
  let payMethod = document.getElementById("pay-method").value;

  if (!name || !phone || !addr) {
    alert("Vui lòng điền đủ thông tin giao hàng!");
    return;
  }

  // Chẻ nhánh thanh toán
  if (payMethod === "Thanh toán khi nhận hàng (COD)") {
    // Nếu là COD -> Chốt đơn luôn
    executeOrder(name, phone, addr, payMethod);
  } else {
    // Nếu là Visa/Chuyển khoản -> Mở Modal giả lập thanh toán
    document.getElementById("modal-pay-amount").innerText = document.getElementById("cart-total").innerText;
    document.getElementById("paymentModal").style.display = "flex";
  }
}

// Đóng hộp thoại thanh toán nếu đổi ý
function closePaymentModal() {
  document.getElementById("paymentModal").style.display = "none";
}

// Khi khách bấm "Đã thanh toán" trên Modal
function confirmFakePayment() {
  let name = document.getElementById("cus-name").value;
  let phone = document.getElementById("cus-phone").value;
  let addr = document.getElementById("cus-address").value;
  let payMethod = document.getElementById("pay-method").value;

  closePaymentModal();
  executeOrder(name, phone, addr, payMethod); // Tiến hành chốt đơn
}

// Hàm chốt đơn chính thức (Chạy hiệu ứng loading và lưu LocalStorage)
function executeOrder(name, phone, addr, payMethod) {
  let overlay = document.getElementById("loading-overlay");
  overlay.style.display = "flex";

  setTimeout(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || []; // Lấy danh sách sản phẩm
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { email: "Khách Vãng Lai" };

    // --- MẮT XÍCH MỚI: TRỪ TỒN KHO ---
    cart.forEach(item => {
      let product = products.find(p => p.id === item.id);
      if (product) {
        product.stock -= item.quantity; // Trừ số lượng đã mua
        if (product.stock < 0) product.stock = 0; // Đảm bảo không bị âm
      }
    });
    localStorage.setItem("products", JSON.stringify(products)); // Lưu lại vào kho
    // ---------------------------------

    let now = new Date();
    let delivery = new Date();
    delivery.setDate(now.getDate() + 4); // Cộng 4 ngày
    orders.push({
      id: "CFS-" + Date.now().toString().slice(-6),
      account: currentUser.email,
      customer: name,
      phone: phone,
      address: addr,
      payment: payMethod,
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString("vi-VN"),
      deliveryDate: delivery.toLocaleDateString("vi-VN"), // Lưu thêm ngày gia
      items: cart,
      total: document.getElementById("cart-total").innerText,
      status: "Đang xử lý",
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    overlay.style.display = "none";
    document.getElementById("successModal").style.display = "flex";
  }, 2000);
}

document.addEventListener("DOMContentLoaded", loadCart);