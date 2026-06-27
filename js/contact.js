function sendContact() {
    let name = document.getElementById("contact-name").value;
    let email = document.getElementById("contact-email").value;
    let phone = document.getElementById("contact-phone").value;
    let msg = document.getElementById("contact-msg").value;
    let fileInput = document.getElementById("contact-img");

    if(!name || !email || !msg) { alert("Vui lòng điền đầy đủ thông tin!"); return; }

    let reader = new FileReader();
    if (fileInput.files.length > 0) {
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function () {
            saveContact(name, email, phone, msg, reader.result);
        };
    } else {
        saveContact(name, email, phone, msg, null);
    }
}

function saveContact(name, email, phone, msg, imgData) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name, email, phone, msg, img: imgData, date: new Date().toLocaleDateString() });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    alert("Cảm ơn bạn đã góp ý!");
    window.location.reload();
}