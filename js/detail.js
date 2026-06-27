let currentId = localStorage.getItem("currentViewId");
let products = JSON.parse(localStorage.getItem("products"));
let p = products.find((x) => x.id == currentId);

if (p) {
  document.getElementById("detail-img").src = p.img;
  document.getElementById("detail-name").innerText = p.name;
  document.getElementById("detail-price").innerText =
    p.price.toLocaleString("vi-VN") + " đ";
  document.getElementById("detail-desc").innerText = "Mô tả: " + p.desc;
  document.getElementById("detail-stock").innerText = p.stock + " sản phẩm";
}

function addCurrentToCart() {
  quickAddToCart(p.id);
}
