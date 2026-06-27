function showTab(t) {
  document
    .querySelectorAll(".tab-content")
    .forEach((e) => (e.style.display = "none"));
  document
    .querySelectorAll(".sidebar a")
    .forEach((e) => e.classList.remove("active"));
  document.getElementById("content-" + t).style.display = "block";
  document.getElementById("tab-" + t).classList.add("active");
  if (t === "products") loadP();
  if (t === "orders") loadO();
  if (t === "users") loadU();
  if (t === "reports") loadR();
  if (t === "contacts") loadC();
}

function loadP() {
  let p = JSON.parse(localStorage.getItem("products"));
  let tb = document.getElementById("list-prod");
  tb.innerHTML = "";
  p.forEach((x, i) => {
    tb.innerHTML += `
      <tr>
        <td>${x.name}</td>
        <td>${x.price.toLocaleString()}</td>
        <td>${x.stock}</td>
        <td>
          <button class="btn-primary" style="padding: 5px 10px; margin-right: 5px; font-size: 14px;" onclick="editP(${i})">Sửa</button>
          <button class="btn-danger" onclick="delP(${i})">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// Hàm xử lý khi bấm nút Sửa
function editP(i) {
  let p = JSON.parse(localStorage.getItem("products"));
  let prod = p[i];

  document.getElementById("edit-id").value = i; // Lưu lại vị trí để tí nữa lưu
  document.getElementById("edit-name").value = prod.name;
  document.getElementById("edit-img").value = prod.img;
  document.getElementById("edit-price").value = prod.price;
  document.getElementById("edit-stock").value = prod.stock;
  document.getElementById("edit-category").value =
    prod.category || "Thức uống và Bánh"; // Nếu không có category thì mặc định là "Thức uống và Bánh"
  document.getElementById("edit-desc").value = prod.desc || "";

  // Trạng thái (nếu món đó chưa có thuộc tính isAvailable thì mặc định là true)
  let isAvailable = prod.isAvailable !== false;
  document.getElementById("edit-status").value = isAvailable ? "true" : "false";

  // Hiển thị Modal
  document.getElementById("editModal").style.display = "flex";
}

// Lưu dữ liệu từ Modal vào LocalStorage
function saveEdit() {
  let i = document.getElementById("edit-id").value;
  let p = JSON.parse(localStorage.getItem("products"));

  p[i].name = document.getElementById("edit-name").value;
  p[i].img = document.getElementById("edit-img").value;
  p[i].price = parseInt(document.getElementById("edit-price").value);
  p[i].stock = parseInt(document.getElementById("edit-stock").value);
  p[i].category = document.getElementById("edit-category").value;
  p[i].desc = document.getElementById("edit-desc").value;
  p[i].isAvailable = document.getElementById("edit-status").value === "true"; // Đổi thành boolean

  localStorage.setItem("products", JSON.stringify(p));
  closeModal(); // Đóng Modal
  loadP(); // Load lại bảng
}

// Đóng Modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

window.editP = editP; // Xuất hàm ra

// Mở Modal Thêm Sản Phẩm
function addP() {
  // Reset lại các ô nhập liệu cho trống trải trước khi mở
  document.getElementById("add-name").value = "";
  document.getElementById("add-img").value = "";
  document.getElementById("add-price").value = "";
  document.getElementById("add-stock").value = "50"; // Mặc định tồn kho là 50
  document.getElementById("add-status").value = "true"; // Mặc định là Còn hàng

  // Bật hộp thoại nổi lên
  document.getElementById("addModal").style.display = "flex";
}

// Lưu sản phẩm mới từ Modal vào hệ thống
function saveAdd() {
  let name = document.getElementById("add-name").value;
  let img = document.getElementById("add-img").value;
  let price = document.getElementById("add-price").value;
  let category = document.getElementById("add-category").value;
  let stock = document.getElementById("add-stock").value;
  let isAvailable = document.getElementById("add-status").value === "true";
  let desc = document.getElementById("add-desc").value;

  // Kiểm tra nếu admin quên nhập tên hoặc giá
  if (!name || !price) {
    alert("Vui lòng nhập Tên và Giá sản phẩm!");
    return;
  }

  let p = JSON.parse(localStorage.getItem("products")) || [];

  // Đẩy sản phẩm mới vào mảng
  p.push({
    id: Date.now(), // Dùng thời gian hiện tại làm ID duy nhất (tránh trùng lặp)
    name: name,
    price: parseInt(price),
    stock: parseInt(stock),
    img: img || "img/logo.png",
    category: category,
    desc: desc || "Đang cập nhật mô tả...",
    isAvailable: isAvailable,
  });

  // Lưu lại và vẽ lại bảng
  localStorage.setItem("products", JSON.stringify(p));
  closeAddModal();
  loadP();
}

// Đóng Modal Thêm Sản Phẩm
function closeAddModal() {
  document.getElementById("addModal").style.display = "none";
}

window.addProduct = addP; // Xuất hàm ra để nút bấm trong HTML gọi được

function delP(i) {
  let p = JSON.parse(localStorage.getItem("products"));
  p.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(p));
  loadP();
}

function loadO() {
  let o = JSON.parse(localStorage.getItem("orders")) || [];
  let tb = document.getElementById("list-order");
  tb.innerHTML = "";

  let reversedOrders = [...o].reverse();

  reversedOrders.forEach((x, i) => {
    let originalIndex = o.length - 1 - i;

    // Lọc bỏ các món có số lượng = 0
    let activeItems = x.items.filter((it) => it.quantity > 0);
    let str = activeItems
      .map((it) => `${it.name} (x${it.quantity})`)
      .join("<br>");

    let shortId = x.id.toString().includes("CFS")
      ? x.id
      : "CFS-" + x.id.toString().replace("ORD", "").slice(-6);
    let customerName = x.customer || "Khách hàng";
    let orderTime = x.time || "--:--";
    let orderDate = x.date || "Chưa cập nhật";
    let paymentMethod = x.payment || "Thanh toán khi nhận hàng (COD)";

    // Tính ngày giao
    //let orderDateObj = new Date(x.date);
    //orderDateObj.setDate(orderDateObj.getDate() + 4);
    //let deliveryDate = orderDateObj.toLocaleDateString();

    let deliveryDate = "Chưa có"; // Giá trị mặc định an toàn

    // Kiểm tra xem x.date có hợp lệ không trước khi tính toán
    if (x.date && x.date.includes("/")) {
      try {
        let parts = x.date.split("/");
        // Đảm bảo định dạng là dd/mm/yyyy
        let d = new Date(parts[2], parts[1] - 1, parts[0]);

        if (!isNaN(d.getTime())) {
          d.setDate(d.getDate() + 4);
          deliveryDate = d.toLocaleDateString("vi-VN");
        }
      } catch (e) {
        console.error("Lỗi định dạng ngày:", x.date);
      }
    }
    tb.innerHTML += `
      <tr>
        <td><strong>${shortId}</strong></td>
        <td>${customerName}</td>
        <td>${orderTime}</td>
        <td>${orderDate}</td>
        <td>${deliveryDate}</td> 
        <td>${str}</td>
        <td>${paymentMethod}</td>
        <td style="color: var(--danger-red); font-weight: bold;">${x.total}</td>
        <td>
            <select onchange="updO(${originalIndex}, this.value)" style="padding: 5px; font-weight: bold; border-radius: 4px; margin-bottom: 5px;">
                <option value="Đang xử lý" ${x.status === "Đang xử lý" ? "selected" : ""}>Đang xử lý</option>
                <option value="Đã giao" ${x.status === "Đã giao" ? "selected" : ""}>Đã giao</option>
            </select>
            <br>
            <button class="btn-primary" style="padding: 4px 8px; font-size: 12px; width: 100%; margin-bottom: 5px;" onclick="editO(${originalIndex})">Sửa đơn</button>
            <button class="btn-danger" style="padding: 4px 8px; font-size: 12px; width: 100%;" onclick="delO(${originalIndex})">Xóa đơn</button>
        </td>
      </tr>
    `;
  });
}

// Mở modal sửa
function editO(i) {
  let o = JSON.parse(localStorage.getItem("orders"));
  let products = JSON.parse(localStorage.getItem("products"));
  let order = o[i];

  document.getElementById("edit-order-index").value = i;
  document.getElementById("edit-order-customer").value = order.customer;

  let listContainer = document.getElementById("edit-order-items-list");
  // Giữ nguyên code của bạn, chỉ thêm nút Thêm ở trên cùng
  listContainer.innerHTML = `<button type="button" class="btn-primary" onclick="addNewItem()" style="margin-bottom: 10px;">+ Thêm món</button>`;

  // Hiển thị từng món trong đơn
  order.items.forEach((item, index) => {
    renderItemRow(item.name, item.quantity);
  });

  document.getElementById("editOrderModal").style.display = "flex";
}

// Hàm phụ để vẽ một dòng món mới
function renderItemRow(name = "", qty = 1) {
  let products = JSON.parse(localStorage.getItem("products"));
  let selectHtml = `<select class="modal-input item-select">`;
  products.forEach((p) => {
    selectHtml += `<option value="${p.name}" ${p.name === name ? "selected" : ""}>${p.name}</option>`;
  });
  selectHtml += `</select>`;

  let row = document.createElement("div");
  row.style.cssText = "display: flex; gap: 5px; margin-bottom: 10px;";
  row.innerHTML = `
        ${selectHtml}
        <input type="number" class="modal-input item-qty" value="${qty}" min="1" style="width: 60px;">
        <button type="button" class="btn-danger" onclick="this.parentElement.remove()">X</button>
    `;
  document.getElementById("edit-order-items-list").appendChild(row);
}

// Hàm để nút "+ Thêm món" gọi tới
function addNewItem() {
  renderItemRow();
}

function saveEditOrder() {
  let i = document.getElementById("edit-order-index").value;
  let o = JSON.parse(localStorage.getItem("orders"));
  let products = JSON.parse(localStorage.getItem("products"));

  o[i].customer = document.getElementById("edit-order-customer").value;

  let newItems = [];
  document.querySelectorAll(".item-select").forEach((select, idx) => {
    let name = select.value;
    let qty = parseInt(document.querySelectorAll(".item-qty")[idx].value);

    // Chỉ thêm vào nếu số lượng > 0
    if (qty > 0) {
      newItems.push({ name: name, quantity: qty });
    }
  });

  // Tính lại tổng tiền
  let newTotal = newItems.reduce((sum, item) => {
    let p = products.find((prod) => prod.name === item.name);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  o[i].items = newItems;
  o[i].total = newTotal.toLocaleString() + " đ";

  localStorage.setItem("orders", JSON.stringify(o));
  closeUserModal("editOrderModal");
  loadO();
}

function updO(i, st) {
  let o = JSON.parse(localStorage.getItem("orders"));
  o[i].status = st;
  localStorage.setItem("orders", JSON.stringify(o));
}

function loadU() {
  let u = JSON.parse(localStorage.getItem("users")) || [];
  let tb = document.getElementById("list-user");
  tb.innerHTML = "";
  u.forEach((x, i) => {
    let displayName = x.name || x.fullname || "Chưa cập nhật";
    tb.innerHTML += `
      <tr>
        <td>${x.email}</td>
        <td>${displayName}</td>
        <td style="color:${x.locked ? "red" : "green"}">${x.locked ? "Đã khóa" : "Hoạt động"}</td>
        <td>
          <button class="btn-primary" style="padding: 5px 10px; margin-right: 5px; font-size: 13px;" onclick="editUser(${i})">Sửa</button>
          <button class="btn-danger" style="padding: 5px 10px; margin-right: 5px; font-size: 13px;" onclick="lockU(${i})">${x.locked ? "Mở" : "Khóa"}</button>
          <button class="btn-danger" style="padding: 5px 10px; font-size: 13px;" onclick="delU(${i})">Xóa</button>
          <button class="btn-primary" style="padding: 5px 10px; margin-left: 5px; font-size: 13px;" onclick="viewUser(${i})">Chi tiết</button>
        </td>
      </tr>
    `;
  });
}

function loadC() {
  let c = JSON.parse(localStorage.getItem("contacts")) || [];
  let tb = document.getElementById("list-contact");
  tb.innerHTML = "";
  c.forEach((x, i) => {
    // Thêm i vào vòng lặp
    let imgHtml = x.img
      ? `<img src="${x.img}" style="width: 50px; height: 50px; object-fit: cover;">`
      : "Không";
    tb.innerHTML += `
            <tr>
                <td>${x.name}</td>
                <td>${x.email}</td>
                <td>${x.phone || ""}</td>
                <td>${x.msg}</td>
                <td>${imgHtml}</td>
                <td>${x.date}</td>
                <td>
                    <button class="btn-danger" onclick="delContact(${i})">Xóa</button>
                </td>
            </tr>`;
  });
}

function delContact(i) {
  if (confirm("Bạn có chắc chắn muốn xóa góp ý này không?")) {
    let c = JSON.parse(localStorage.getItem("contacts")) || [];
    c.splice(i, 1); // Xóa phần tử tại vị trí i
    localStorage.setItem("contacts", JSON.stringify(c)); // Lưu lại
    loadC(); // Load lại bảng
  }
}

function lockU(i) {
  let u = JSON.parse(localStorage.getItem("users"));
  u[i].locked = !u[i].locked;
  localStorage.setItem("users", JSON.stringify(u));
  loadU();
}

function loadR() {
  let o = JSON.parse(localStorage.getItem("orders"));
  let rev = 0,
    ord = 0,
    top = {};
  o.forEach((x) => {
    if (x.status === "Đã giao") {
      ord++;
      rev += parseInt(x.total.replace(/\D/g, ""));
      x.items.forEach(
        (it) => (top[it.name] = (top[it.name] || 0) + it.quantity),
      );
    }
  });
  document.getElementById("rev").innerText = rev.toLocaleString() + " đ";
  document.getElementById("ord").innerText = ord;
  let tb = document.getElementById("list-top");
  tb.innerHTML = "";
  Object.keys(top)
    .sort((a, b) => top[b] - top[a])
    .forEach(
      (k) => (tb.innerHTML += `<tr><td>${k}</td><td>${top[k]}</td></tr>`),
    );
}

function logoutAdmin() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Xóa người dùng
function delU(i) {
  if (confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
    let u = JSON.parse(localStorage.getItem("users"));
    u.splice(i, 1);
    localStorage.setItem("users", JSON.stringify(u));
    loadU();
  }
}

/// Mở Modal Xem Chi tiết
function viewUser(i) {
  let u = JSON.parse(localStorage.getItem("users"));
  let user = u[i];

  // Kiểm tra nếu user bị undefined thì dừng lại
  if (!user) {
    alert("Không tìm thấy thông tin!");
    return;
  }

  // Gán giá trị
  document.getElementById("view-user-name").innerText =
    user.name || "Chưa cập nhật";
  document.getElementById("view-user-email").innerText =
    user.email || "Chưa cập nhật";
  document.getElementById("view-user-gender").innerText =
    user.gender || "Chưa cập nhật";

  // KIỂM TRA ĐÚNG ID NÀY:
  let phoneEl = document.getElementById("view-user-phone");
  if (phoneEl) phoneEl.innerText = user.phone || "Chưa cập nhật";

  document.getElementById("view-user-address").innerText =
    user.address || "Chưa cập nhật";

  document.getElementById("viewUserModal").style.display = "flex";
}

// Mở Modal Thêm Người dùng
function openAddUserModal() {
  document.getElementById("add-user-name").value = "";
  document.getElementById("add-user-email").value = "";
  document.getElementById("add-user-pass").value = "";
  document.getElementById("add-user-gender").value = "Nam";
  document.getElementById("add-user-address").value = "";

  document.getElementById("addUserModal").style.display = "flex";
}

// Lưu người dùng mới
function saveAddUser() {
  let name = document.getElementById("add-user-name").value;
  let email = document.getElementById("add-user-email").value;
  let pass = document.getElementById("add-user-pass").value;
  let gender = document.getElementById("add-user-gender").value;
  let address = document.getElementById("add-user-address").value;

  if (!name || !email || !pass) {
    alert("Vui lòng điền đầy đủ Họ tên, Email và Mật khẩu!");
    return;
  }

  let u = JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra email trùng lặp
  if (u.find((user) => user.email === email)) {
    alert("Email này đã được sử dụng!");
    return;
  }

  u.push({
    name: name,
    email: email,
    password: pass, // Lưu vào là password
    pass: pass, // Lưu thêm backup là pass cho chắc chắn khớp với mọi hàm login
    gender: gender,
    address: address,
    locked: false,
  });

  localStorage.setItem("users", JSON.stringify(u));
  closeUserModal("addUserModal");
  loadU();
}

// Hàm xóa đơn hàng
function delO(i) {
  if (confirm("🚨 Bạn có chắc chắn muốn xóa đơn hàng này vĩnh viễn không?")) {
    let o = JSON.parse(localStorage.getItem("orders"));
    o.splice(i, 1); // Cắt bỏ đơn hàng tại vị trí i
    localStorage.setItem("orders", JSON.stringify(o));
    loadO(); // Load lại bảng
  }
}

// Đóng Modal chung cho User
function closeUserModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function editUser(i) {
  let u = JSON.parse(localStorage.getItem("users"));
  let user = u[i];

  document.getElementById("edit-user-index").value = i;
  document.getElementById("edit-user-email").value = user.email;
  document.getElementById("edit-user-name").value = user.name || "";
  document.getElementById("edit-user-gender").value = user.gender || "Nam";
  document.getElementById("edit-user-phone").value = user.phone || "";
  document.getElementById("edit-user-addr").value = user.address || "";

  document.getElementById("editUserModal").style.display = "flex";
}

function saveEditUser() {
  let i = document.getElementById("edit-user-index").value;
  let u = JSON.parse(localStorage.getItem("users"));

  u[i].name = document.getElementById("edit-user-name").value;
  u[i].gender = document.getElementById("edit-user-gender").value;
  u[i].phone = document.getElementById("edit-user-phone").value;
  u[i].address = document.getElementById("edit-user-addr").value;

  localStorage.setItem("users", JSON.stringify(u));
  closeUserModal("editUserModal");
  loadU();
  alert("Cập nhật thành công!");
}

window.onload = function () {
  loadP();
};
