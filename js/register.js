function togglePassword(id) {
  let input = document.getElementById(id);
  input.type = (input.type === "password") ? "text" : "password";
}

function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let confirmPass = document.getElementById("confirm-pass").value;

  if (!name || !email || !pass) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  if (pass !== confirmPass) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.email === email)) {
    alert("Email này đã được đăng ký!");
    return;
  }

  users.push({ 
    email: email, 
    name: name, 
    password: pass, // Đã lưu mật khẩu
    phone: "", 
    address: "", 
    gender: "Khác", 
    locked: false 
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công!");
  window.location.href = "login.html";
}