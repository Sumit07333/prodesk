const theme = document.getElementById("theme-btn");
const menu = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(themeName) {
    const isDark = themeName === "dark";
    document.body.classList.toggle("dark", isDark);
    theme.innerHTML = isDark ? "&#9788;" : "&#9790;";
    theme.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeMeta.setAttribute("content", isDark ? "#0f172a" : "#f5f7fb");
}

const savedTheme = localStorage.getItem("prodesk-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

theme.addEventListener("click", function () {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("prodesk-theme", nextTheme);
});

function closeMenu() {
    nav.classList.remove("show");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open Menu");
}

menu.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("show");
    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
});

nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
});
