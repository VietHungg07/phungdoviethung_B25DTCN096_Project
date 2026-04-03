const input = document.getElementById("category-name");
const addBtn = document.getElementById("addBtn");
const table = document.getElementById("categoryTable");

let categories = JSON.parse(localStorage.getItem("categories")) || [];
let editingId = null;

// ===== HIỂN THỊ =====
function renderCategories() {
    table.innerHTML = "";

    if (categories.length === 0) {
        table.innerHTML = `<tr><td colspan="3">Không có chủ đề</td></tr>`;
        return;
    }

    categories.forEach((cat, index) => {
        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${cat.name}</td>
            <td>
                <button onclick="editCategory(${cat.id})">Sửa</button>
                <button onclick="deleteCategory(${cat.id})">Xóa</button>
            </td>
        </tr>
        `;
    });
}

// ===== THÊM / SỬA =====
addBtn.onclick = function () {
    let name = input.value.trim();

    if (name === "") {
        alert("Tên chủ đề không được để trống");
        return;
    }

    // ===== SỬA =====
    if (editingId !== null) {
        categories = categories.map(cat => {
            if (cat.id === editingId) {
                return { ...cat, name };
            }
            return cat;
        });

        editingId = null;
        addBtn.innerText = "Add Category";
    } 
    // ===== THÊM =====
    else {
        let newCat = {
            id: Date.now(),
            name: name
        };
        categories.push(newCat);
    }

    saveData();
    input.value = "";
};

// ===== XÓA =====
function deleteCategory(id) {
    let confirmDelete = confirm("Bạn có chắc muốn xóa?");
    if (!confirmDelete) return;

    categories = categories.filter(cat => cat.id !== id);
    saveData();
}

// ===== SỬA =====
function editCategory(id) {
    let cat = categories.find(c => c.id === id);

    input.value = cat.name;
    editingId = id;

    addBtn.innerText = "Update";
}

// ===== LƯU =====
function saveData() {
    localStorage.setItem("categories", JSON.stringify(categories));
    renderCategories();
}

// ===== LOAD =====
renderCategories();