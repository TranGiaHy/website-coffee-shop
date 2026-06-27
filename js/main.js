const defaultProducts = [
  {
    id: 1,
    name: "Trà Đào Cam Sả (M)",
    price: 60000,
    img: "img/tradaocamsa.png",
    stock: 50,
    desc: "Trà đào ngọt thanh, sả thơm lừng.",
  },
  {
    id: 2,
    name: "Trà Đào Cam Sả (L)",
    price: 60000,
    img: "img/tradaocamsa.png",
    stock: 50,
    desc: "Trà đào ngọt thanh, sả thơm lừng.",
  },
  {
    id: 3,
    name: "Trà Sữa Ô Long (M)",
    price: 60000,
    img: "img/trasuaolong.png",
    stock: 40,
    desc: "Trà Ô Long hảo hạng.",
  },
  {
    id: 4,
    name: "Trà Sữa Ô Long (L)",
    price: 60000,
    img: "img/trasuaolong.png",
    stock: 40,
    desc: "Trà Ô Long hảo hạng.",
  },
  {
    id: 5,
    name: "Hồng Trà Sữa (M)",
    price: 60000,
    img: "img/hongtrasua.png",
    stock: 30,
    desc: "Hồng trà nguyên bản.",
  },
  {
    id: 6,
    name: "Hồng Trà Sữa (L)",
    price: 60000,
    img: "img/hongtrasua.png",
    stock: 30,
    desc: "Hồng trà nguyên bản.",
  },
  {
    id: 7,
    name: "Trà Sữa Lài (M)",
    price: 55000,
    img: "img/trasualai.png",
    stock: 20,
    desc: "Hương lài thơm ngát.",
  },
  {
    id: 8,
    name: "Trà Sữa Lài (L)",
    price: 55000,
    img: "img/trasualai.png",
    stock: 20,
    desc: "Hương lài thơm ngát.",
  },

  // ĐÁ XAY
  {
    id: 9,
    name: "Matcha Đá Xay (M)",
    price: 55000,
    img: "img/matcha.png",
    stock: 50,
    desc: "Đá xay mát lạnh.",
  },
  {
    id: 10,
    name: "Matcha Đá Xay (L)",
    price: 65000,
    img: "img/matcha.png",
    stock: 50,
    desc: "Đá xay mát lạnh.",
  },
  {
    id: 11,
    name: "Choco Đá Xay (M)",
    price: 50000,
    img: "img/choco.png",
    stock: 50,
    desc: "Sô cô la đậm đà.",
  },
  {
    id: 12,
    name: "Choco Đá Xay (L)",
    price: 60000,
    img: "img/choco.png",
    stock: 50,
    desc: "Sô cô la đậm đà.",
  },
  {
    id: 13,
    name: "Cookie Đá Xay (M)",
    price: 50000,
    img: "img/cookie.png",
    stock: 50,
    desc: "Bánh quy xay giòn rụm.",
  },
  {
    id: 14,
    name: "Cookie Đá Xay (L)",
    price: 60000,
    img: "img/cookie.png",
    stock: 50,
    desc: "Bánh quy xay giòn rụm.",
  },

  // SỮA TƯƠI
  {
    id: 15,
    name: "Sữa Tươi Trân Châu (M)",
    price: 45000,
    img: "img/sttc.png",
    stock: 50,
    desc: "Sữa tươi ngọt ngào.",
  },
  {
    id: 16,
    name: "Sữa Tươi Trân Châu (L)",
    price: 55000,
    img: "img/sttc.png",
    stock: 50,
    desc: "Sữa tươi ngọt ngào.",
  },
  {
    id: 17,
    name: "Sữa Dâu Latte (M)",
    price: 42000,
    img: "img/suadau.png",
    stock: 50,
    desc: "Hương dâu tự nhiên.",
  },
  {
    id: 18,
    name: "Sữa Dâu Latte (L)",
    price: 52000,
    img: "img/suadau.png",
    stock: 50,
    desc: "Hương dâu tự nhiên.",
  },
  {
    id: 19,
    name: "Sữa Tươi Việt Quất TC (M)",
    price: 55000,
    img: "img/vietquat.png",
    stock: 50,
    desc: "Việt quất chua ngọt.",
  },
  {
    id: 20,
    name: "Sữa Tươi Việt Quất TC (L)",
    price: 65000,
    img: "img/vietquat.png",
    stock: 50,
    desc: "Việt quất chua ngọt.",
  },

  // TRÀ
  {
    id: 21,
    name: "Trà Ổi Hồng (M)",
    price: 55000,
    img: "img/traoi.png",
    stock: 50,
    desc: "Thanh mát vị ổi.",
  },
  {
    id: 22,
    name: "Trà Ổi Hồng (L)",
    price: 65000,
    img: "img/traoi.png",
    stock: 50,
    desc: "Thanh mát vị ổi.",
  },
  {
    id: 23,
    name: "Trà Vải (M)",
    price: 55000,
    img: "img/travai.png",
    stock: 50,
    desc: "Vải ngâm ngọt lịm.",
  },
  {
    id: 24,
    name: "Trà Vải (L)",
    price: 65000,
    img: "img/travai.png",
    stock: 50,
    desc: "Vải ngâm ngọt lịm.",
  },
  {
    id: 25,
    name: "Trà Dâu (M)",
    price: 60000,
    img: "img/tradau.png",
    stock: 50,
    desc: "Trà dâu tươi mát.",
  },
  {
    id: 26,
    name: "Trà Dâu (L)",
    price: 70000,
    img: "img/tradau.png",
    stock: 50,
    desc: "Trà dâu tươi mát.",
  },
  {
    id: 27,
    name: "Trà Thạch Đào (M)",
    price: 65000,
    img: "img/trathachdao.png",
    stock: 50,
    desc: "Kèm thạch đào giòn.",
  },
  {
    id: 28,
    name: "Trà Thạch Đào (L)",
    price: 75000,
    img: "img/trathachdao.png",
    stock: 50,
    desc: "Kèm thạch đào giòn.",
  },

  // CÀ PHÊ
  {
    id: 29,
    name: "Tiramisu Coffee (M)",
    price: 59000,
    img: "img/tiramisucf.png",
    stock: 50,
    desc: "Vị bánh Tiramisu.",
  },
  {
    id: 30,
    name: "Tiramisu Coffee (L)",
    price: 69000,
    img: "img/tiramisucf.png",
    stock: 50,
    desc: "Vị bánh Tiramisu.",
  },
  {
    id: 31,
    name: "Mocha (M)",
    price: 55000,
    img: "img/mocha.png",
    stock: 50,
    desc: "Cà phê pha sô cô la.",
  },
  {
    id: 32,
    name: "Mocha (L)",
    price: 65000,
    img: "img/mocha.png",
    stock: 50,
    desc: "Cà phê pha sô cô la.",
  },
  {
    id: 33,
    name: "Cà Phê Pha Phin (M)",
    price: 39000,
    img: "img/caphephin.png",
    stock: 50,
    desc: "Cà phê truyền thống.",
  },
  {
    id: 34,
    name: "Cà Phê Pha Phin (L)",
    price: 49000,
    img: "img/caphephin.png",
    stock: 50,
    desc: "Cà phê truyền thống.",
  },
  {
    id: 35,
    name: "Latte Đá (M)",
    price: 55000,
    img: "img/latteda.png",
    stock: 50,
    desc: "Nhiều sữa béo ngậy.",
  },
  {
    id: 36,
    name: "Latte Đá (L)",
    price: 65000,
    img: "img/latteda.png",
    stock: 50,
    desc: "Nhiều sữa béo ngậy.",
  },
  {
    id: 37,
    name: "Latte Nóng (M)",
    price: 55000,
    img: "img/latte.png",
    stock: 50,
    desc: "Nhiều sữa béo ngậy.",
  },
  {
    id: 38,
    name: "Latte Nóng (L)",
    price: 65000,
    img: "img/latte.png",
    stock: 50,
    desc: "Nhiều sữa béo ngậy.",
  },
  {
    id: 39,
    name: "Cold Brew (M)",
    price: 50000,
    img: "img/coldbrew.png",
    stock: 50,
    desc: "Cà phê ủ lạnh.",
  },
  {
    id: 40,
    name: "Cold Brew (L)",
    price: 60000,
    img: "img/coldbrew.png",
    stock: 50,
    desc: "Cà phê ủ lạnh.",
  },

  // BÁNH NGỌT (1 Size)
  {
    id: 41,
    name: "Bánh Tiramisu",
    price: 50000,
    img: "img/tiramisu.png",
    stock: 20,
    desc: "Bánh mềm tan trong miệng.",
  },
  {
    id: 42,
    name: "Passion Cake",
    price: 45000,
    img: "img/passioncake.png",
    stock: 20,
    desc: "Bánh chanh dây chua ngọt.",
  },
  {
    id: 43,
    name: "Croissant",
    price: 35000,
    img: "img/croissant.png",
    stock: 20,
    desc: "Bánh sừng bò ngàn lớp.",
  },
  {
    id: 44,
    name: "Red Velvet Cake",
    price: 45000,
    img: "img/redcake.png",
    stock: 20,
    desc: "Bánh đỏ nhung cao cấp.",
  },
  {
    id: 45,
    name: "Bánh Macaron (2 cái)",
    price: 35000,
    img: "img/macaron.png",
    stock: 20,
    desc: "Bánh Pháp ngọt ngào.",
  },

  // SẢN PHẨM ĐÓNG GÓI
  {
    id: 46,
    name: "Cà Phê Đóng Gói (250g)",
    price: 90000,
    img: "img/caphegoi.png",
    stock: 100,
    desc: "Hạt cà phê rang xay.",
  },
  {
    id: 47,
    name: "Cà Phê Đóng Gói (500g)",
    price: 170000,
    img: "img/caphegoi.png",
    stock: 100,
    desc: "Hạt cà phê rang xay.",
  },
  {
    id: 48,
    name: "Trà Đóng Gói (100g)",
    price: 85000,
    img: "img/tradonggoi.png",
    stock: 100,
    desc: "Lá trà sấy khô.",
  },
  {
    id: 49,
    name: "Trà Đóng Gói (250g)",
    price: 160000,
    img: "img/tradonggoi.png",
    stock: 100,
    desc: "Lá trà sấy khô.",
  },
  {
    id: 50,
    name: "Trà Tắc Đóng Gói (250g)",
    price: 75000,
    img: "img/tratac.png",
    stock: 100,
    desc: "Trà hòa tan tiện lợi.",
  },
  {
    id: 51,
    name: "Trà Tắc Đóng Gói (500g)",
    price: 140000,
    img: "img/tratac.png",
    stock: 100,
    desc: "Trà hòa tan tiện lợi.",
  },
];

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(defaultProducts));
}
if (!localStorage.getItem("users"))
  localStorage.setItem("users", JSON.stringify([]));
if (!localStorage.getItem("orders"))
  localStorage.setItem("orders", JSON.stringify([]));

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
