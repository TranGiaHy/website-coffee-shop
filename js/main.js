// Render Sản Phẩm Động (Dùng chung cho Trang chủ, Menu, Đóng gói)
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  // Lấy data-page từ thẻ body để phân loại trang
  const pageType = document.body.getAttribute("data-page") || "home";

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let keyword =
    document.getElementById("search-input")?.value.toLowerCase() || "";
  let sortPrice = document.getElementById("filter-price")?.value || "all";

// Lọc sản phẩm theo từng trang
  let filtered = products;
  if (pageType === "menu") {
    // Thức uống: lấy ID < 46 HOẶC những món mới thêm có ID lớn (Date.now)
    filtered = products.filter((p) => p.id < 46 || p.id > 1000); 
  } else if (pageType === "packages") {
    // Đóng gói: Chỉ lấy đúng ID từ 46 đến 99 (các món đóng gói cũ)
    filtered = products.filter((p) => p.id >= 46 && p.id < 1000); 
  } else if (pageType === "home") {
    const featuredIds = [27, 11, 19, 29, 39, 13, 41, 42];
    filtered = products.filter((p) => featuredIds.includes(p.id));
  }

  // Lọc theo tên
  filtered = filtered.filter((p) => p.name.toLowerCase().includes(keyword));

  // Sắp xếp theo giá
  if (sortPrice === "asc") filtered.sort((a, b) => a.price - b.price);
  if (sortPrice === "desc") filtered.sort((a, b) => b.price - a.price);

  productList.innerHTML = "";
  if (filtered.length === 0) {
    productList.innerHTML =
      "<p style='grid-column: span 4; text-align: center; color: #aaa;'>Không tìm thấy sản phẩm.</p>";
  }

filtered.forEach((p) => {
    // 1. Kiểm tra trạng thái: Mặc định là true (còn hàng)
    let isAvailable = p.isAvailable !== false; 

    // 2. Xử lý Nút bấm
    let buttonHtml = isAvailable 
      ? `<button class="btn-primary" style="width: 100%" onclick="event.stopPropagation(); quickAddToCart(${p.id})">🛒 Mua ngay</button>`
      : `<button class="btn-danger" style="width: 100%; cursor: not-allowed; opacity: 0.6;" disabled>❌ Tạm hết hàng</button>`;

    // 3. Xử lý Hình ảnh (Làm mờ và đè chữ nếu hết hàng)
    let imageHtml = isAvailable
      ? `<img src="${p.img}" alt="${p.name}">`
      : `<div style="position: relative;">
             <img src="${p.img}" alt="${p.name}" class="img-grayscale">
             <div class="out-of-stock-overlay">HẾT HÀNG</div>
         </div>`;

    // 4. Xử lý Click Card (Khóa không cho xem chi tiết nếu hết hàng)
    let cardClick = isAvailable 
      ? `onclick="viewDetail(${p.id})"` 
      : `style="cursor: not-allowed;"`;

    // 5. In ra HTML
    productList.innerHTML += `
      <div class="product-card" ${cardClick}>
          ${imageHtml}
          <h3 style="${!isAvailable ? 'color: #777;' : ''}">${p.name}</h3>
          <span class="price" style="${!isAvailable ? 'color: #777;' : ''}">${p.price.toLocaleString("vi-VN")} đ</span>
          ${buttonHtml}
      </div>
    `;
  });
}

function viewDetail(id) {
  localStorage.setItem("currentViewId", id);
  window.location.href = "detail.html";
}

function quickAddToCart(id) {
  let products = JSON.parse(localStorage.getItem("products"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find((p) => p.id === id);

  let existingItem = cart.find((item) => item.id === id);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  showToast("Đã thêm vào giỏ hàng!");
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  let badge = document.getElementById("cart-count");
  if (badge) badge.innerText = count;
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Kiểm tra User đăng nhập và Phân quyền
function checkLoginState() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let usernameDisplay = document.getElementById("username-display");
  let dropdown = document.getElementById("user-dropdown");
  let trigger = document.querySelector(".user-trigger");
  let adminLink = document.getElementById("admin-link");

  if (currentUser) {
    usernameDisplay.innerText = currentUser.name || currentUser.email;
    trigger.onclick = function() { toggleDropdown(); };

    // TÙY CHỈNH MENU CHO ADMIN VÀ USER
    if (currentUser.role === "admin") {
      // Nếu là Admin: Chỉ hiện Đăng xuất, ẩn Cập nhật & Lịch sử
      dropdown.innerHTML = `
        <a href="#" onclick="logout()">Đăng xuất</a>
      `;
      if (adminLink) adminLink.style.display = "inline-block";
    } else {
      // Nếu là User: Hiện đầy đủ menu
      dropdown.innerHTML = `
        <a href="#" onclick="openEditProfile()">Cập nhật thông tin</a>
        <a href="history.html">Lịch sử đơn</a>
        <a href="#" onclick="logout()">Đăng xuất</a>
      `;
      if (adminLink) adminLink.style.display = "none";
    }
  } else {
    // CHƯA ĐĂNG NHẬP
    usernameDisplay.innerHTML = 'Đăng nhập';
    trigger.onclick = function() { window.location.href = "login.html"; };
    dropdown.style.display = "none";
    if (adminLink) adminLink.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

function toggleDropdown() {
    // Chỉ cho phép xổ menu nếu đã đăng nhập
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return; // Nếu chưa đăng nhập thì không làm gì cả

    let drop = document.getElementById("user-dropdown");
    drop.style.display = (drop.style.display === "block") ? "none" : "block";
}

function openEditProfile() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Bạn cần đăng nhập để cập nhật thông tin!");
        window.location.href = "login.html";
        return;
    }
    document.getElementById("edit-user-name").value = user.name || "";
    document.getElementById("edit-user-phone").value = user.phone || "";
    document.getElementById("edit-user-addr").value = user.address || "";
    document.getElementById("editProfileModal").style.display = "flex";
}

function saveProfile() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if(!user) return;

    // Cập nhật thông tin từ Modal vào đối tượng user
    user.name = document.getElementById("edit-user-name").value;
    user.phone = document.getElementById("edit-user-phone").value;
    user.address = document.getElementById("edit-user-addr").value;

    // Lưu lại vào currentUser
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    // Cập nhật luôn vào danh sách users trong localStorage (để đồng bộ)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let index = users.findIndex(u => u.email === user.email);
    if(index !== -1) {
        users[index] = user;
        localStorage.setItem("users", JSON.stringify(users));
    }

    alert("Đã cập nhật thông tin!");
    document.getElementById("editProfileModal").style.display = "none";
    location.reload(); // Tải lại để cập nhật tên trên header
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartBadge();
  checkLoginState();
});
