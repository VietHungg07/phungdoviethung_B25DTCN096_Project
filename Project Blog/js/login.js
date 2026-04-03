const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const btn = document.querySelector("button");

// hàm set lỗi
function setError(input, message) {
    const small = input.nextElementSibling.nextElementSibling;
    small.innerText = message;
    input.classList.add("error-input");
}

// xóa lỗi
function clearError(input) {
    const small = input.nextElementSibling.nextElementSibling;
    small.innerText = "";
    input.classList.remove("error-input");
}

btn.addEventListener("click", function (e) {
    e.preventDefault();

    // reset lỗi
    clearError(emailInput);
    clearError(passwordInput);

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let isValid = true;

    // validate
    if (email === "") {
        setError(emailInput, "Email không được để trống");
        isValid = false;
    }

    if (password === "") {
        setError(passwordInput, "Mật khẩu không được để trống");
        isValid = false;
    }

    if (!isValid) return;

    // lấy data
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        setError(passwordInput, "Email hoặc mật khẩu không đúng");
        return;
    }

    // success
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "../html/home.html";
});