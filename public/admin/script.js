
history.pushState(null, "", location.href);
window.onpopstate = function () {
    history.pushState(null, "", location.href);
};



if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "/index.html";
}


function logout() {
    localStorage.removeItem("loggedIn");

    // Blok back
    history.pushState(null, "", location.href);
    window.onpopstate = function () {
        history.pushState(null, "", location.href);
    };

    window.location.href = "/index.html";
}


document.querySelector(".logout").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
});

/* =======================================================
   SIDEBAR ACTIVE MENU
======================================================= */
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
        li.classList.add('active');
    });
});

/* =======================================================
   SIDEBAR TOGGLE
======================================================= */
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

/* =======================================================
   RESPONSIVE SEARCH INPUT
======================================================= */
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');

        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

/* =======================================================
   DARK MODE (DENGAN SAVE THEME)
======================================================= */
const switchMode = document.getElementById('switch-mode');

// Load theme
if (localStorage.getItem("theme") === "dark") {
    switchMode.checked = true;
    document.body.classList.add("dark");
}

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem("theme", "light");
    }
});

/* =======================================================
   SEARCH BAR (FILTER TABEL)
======================================================= */
const tableSearch = document.querySelector("nav input[type='search']");
tableSearch.addEventListener("input", () => {
    const keyword = tableSearch.value.toLowerCase();
    const rows = document.querySelectorAll(".order table tbody tr");

    rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(keyword) ? "" : "none";
    });
});

/* =======================================================
   TODO LIST (ADD + TOGGLE)
======================================================= */
const todoList = document.querySelector(".todo-list");
const addTodoBtn = document.querySelector(".todo .bx-plus");

// Tambah todo
addTodoBtn.addEventListener("click", () => {
    const text = prompt("Tambah todo:");

    if (text && text.trim() !== "") {
        const li = document.createElement("li");
        li.className = "not-completed";
        li.innerHTML = `
            <p>${text}</p>
            <i class='bx bx-dots-vertical-rounded'></i>
        `;
        todoList.appendChild(li);
    }
});

// Toggle todo status
todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "P") {
        const li = e.target.parentElement;

        if (li.classList.contains("completed")) {
            li.classList.remove("completed");
            li.classList.add("not-completed");
        } else {
            li.classList.remove("not-completed");
            li.classList.add("completed");
        }
    }
});
