const firstName = document.querySelector(".f_name input");
const lastName = document.querySelector(".l_name input");
const email = document.querySelectorAll(".line-body input")[0];
const password = document.querySelectorAll(".line-body input")[1];
const confirmPassword = document.querySelectorAll(".line-body input")[2];
const btn = document.querySelector("button");

// lấy tất cả error
const errors = document.querySelectorAll(".error");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// hàm set lỗi
function setError(input, message) {
    const parent = input.parentElement;
    const small = parent.querySelector(".error");

    small.innerText = message;
    input.classList.add("error-input");
}

// xóa lỗi
function clearError(input) {
    const parent = input.parentElement;
    const small = parent.querySelector(".error");

    small.innerText = "";
    input.classList.remove("error-input");
}

// clear all
function clearAllErrors() {
    document.querySelectorAll("input").forEach(input => {
        clearError(input);
    });
}

btn.addEventListener("click", function (e) {
    e.preventDefault();

    clearAllErrors();

    let isValid = true;

    let fName = firstName.value.trim();
    let lName = lastName.value.trim();
    let mail = email.value.trim();
    let pass = password.value.trim();
    let confirmPass = confirmPassword.value.trim();

    // ===== VALIDATE =====

    if (fName === "") {
        setError(firstName, "Không được để trống");
        isValid = false;
    }

    if (lName === "") {
        setError(lastName, "Không được để trống");
        isValid = false;
    }

    if (mail === "") {
        setError(email, "Email không được để trống");
        isValid = false;
    } else if (!emailRegex.test(mail)) {
        setError(email, "Email không đúng định dạng");
        isValid = false;
    }

    if (pass === "") {
        setError(password, "Mật khẩu không được để trống");
        isValid = false;
    } else if (pass.length < 6) {
        setError(password, "Tối thiểu 6 ký tự");
        isValid = false;
    }

    if (confirmPass === "") {
        setError(confirmPassword, "Không được để trống");
        isValid = false;
    } else if (pass !== confirmPass) {
        setError(confirmPassword, "Không trùng khớp");
        isValid = false;
    }

    if (!isValid) return;

    // ===== LƯU DATA =====
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let isExist = users.some(user => user.email === mail);
    if (isExist) {
        setError(email, "Email đã tồn tại");
        return;
    }

    let newUser = {
        id: Date.now(),
        firstName: fName,
        lastName: lName,
        email: mail,
        password: pass
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    window.location.href = "../html/login.html";
});