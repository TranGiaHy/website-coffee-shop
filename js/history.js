window.onload = function () {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let tbody = document.getElementById("history-body");

  let userOrders = currentUser
    ? orders.filter((o) => o.account === currentUser.email)
    : orders;

  if (userOrders.length === 0) {
    // 5 cột thì colspan = 5
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align:center; padding: 30px;">Bạn chưa có đơn hàng nào.</td></tr>';
    return;
  }

  userOrders.forEach((o) => {
    let itemNames = o.items.map((i) => `${i.name} (x${i.quantity})`).join("<br>");
    
    // Rút gọn Mã đơn (CFS-xxxxxx)
    let shortId = "CFS-" + o.id.toString().replace("ORD", "").slice(-6);
    
    // Phương thức thanh toán
    let paymentMethod = o.payment || "Thanh toán khi nhận hàng (COD)";

    tbody.innerHTML += `
      <tr>
        <td><strong>${shortId}</strong></td>
        <td>${itemNames}</td>
        <td>${paymentMethod}</td>
        <td style="color: var(--danger-red); font-weight: bold;">${o.total}</td>
        <td style="color: ${o.status === "Đã giao" ? "green" : "orange"}; font-weight: bold;">${o.status}</td>
      </tr>
    `;
  });
};