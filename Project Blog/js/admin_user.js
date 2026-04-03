const tableBody = document.getElementById("userTableBody");

function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    renderUsers(users);
}

function renderUsers(users) {
    tableBody.innerHTML = "";

    if (users.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.colSpan = 4;
        td.innerText = "Không có user";

        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
    }

    users.forEach(user => {
        let tr = document.createElement("tr");

        // ===== NAME =====
        let tdName = document.createElement("td");

        let userInfo = document.createElement("div");
        userInfo.className = "user-info";

        let img = document.createElement("img");
        img.src = "../image/Avatar (3).png";
        img.className = "avatar";

        let meta = document.createElement("div");
        meta.className = "user-meta";

        let name = document.createElement("p");
        name.className = "user-name";
        name.innerText = user.firstName + " " + user.lastName;

        let handle = document.createElement("p");
        handle.className = "user-handle";
        handle.innerText = "@" + user.firstName;

        meta.appendChild(name);
        meta.appendChild(handle);

        userInfo.appendChild(img);
        userInfo.appendChild(meta);
        tdName.appendChild(userInfo);

        // ===== STATUS =====
        let tdStatus = document.createElement("td");
        let status = document.createElement("span");
        status.className = "status-text";

        let statusText = user.status === "blocked" ? "bị khóa" : "hoạt động";
        status.innerText = statusText;

        tdStatus.appendChild(status);

        // ===== EMAIL =====
        let tdEmail = document.createElement("td");
        tdEmail.className = "email-text";
        tdEmail.innerText = user.email;

        // ===== ACTION =====
        let tdAction = document.createElement("td");

        let group = document.createElement("div");
        group.className = "action-group";

        let blockBtn = document.createElement("a");
        blockBtn.innerText = "block";
        blockBtn.href = "#";
        blockBtn.onclick = () => blockUser(user.id);

        let unblockBtn = document.createElement("a");
        unblockBtn.innerText = "unblock";
        unblockBtn.href = "#";
        unblockBtn.onclick = () => unblockUser(user.id);

        group.appendChild(blockBtn);
        group.appendChild(unblockBtn);
        tdAction.appendChild(group);

        // ===== APPEND =====
        tr.appendChild(tdName);
        tr.appendChild(tdStatus);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAction);

        tableBody.appendChild(tr);
    });
}

// ===== BLOCK =====
function blockUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(user => {
        if (user.id === id) user.status = "blocked";
    });

    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

// ===== UNBLOCK =====
function unblockUser(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(user => {
        if (user.id === id) user.status = "active";
    });

    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();
}

loadUsers();