// Hàm ẩn/hiện mật khẩu (Đứng độc lập)
function togglePassword() {
  let passInput = document.getElementById("pass");
  let eyeIcon = document.getElementById("eye-icon");

  if (passInput.type === "password") {
    passInput.type = "text";
    // Đổi từ icon gạch chéo sang icon mở mắt
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  } else {
    passInput.type = "password";
    // Đổi về lại icon gạch chéo
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  }
}

function login() {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  // 1. Kiểm tra Admin
  if (email === "admin" && pass === "123") {
    let adminUser = { email: "admin", role: "admin", name: "Quản trị viên" };
    localStorage.setItem("currentUser", JSON.stringify(adminUser));
    window.location.href = "admin.html";
    return;
  }

  // 2. Kiểm tra User thường
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Debug: In ra số lượng user đang có
  console.log("Tổng số user trong kho:", users.length);

  let user = users.find((u) => {
    // In ra email và mật khẩu của từng user trong lúc tìm để so sánh
    console.log("Đang so sánh:", u.email, "với", email);
    
    let isEmailMatch = (u.email === email);
    // Chỉ cần kiểm tra đúng trường mà bạn đã lưu trong register.js
    // Ví dụ nếu register bạn lưu là u.password, thì chỉ cần u.password === pass
    let isPassMatch = (u.password === pass || u.pass === pass); 
    
    return isEmailMatch && isPassMatch;
  });

  if (!user) {
    alert("Tài khoản hoặc mật khẩu không đúng!\nKiểm tra lại Console (F12) để xem dữ liệu.");
    return;
  }
  
  if (user.locked) {
    alert("Tài khoản đã bị Admin khóa!");
    return;
  }

  user.role = "user";
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
}