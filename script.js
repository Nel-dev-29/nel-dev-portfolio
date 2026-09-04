// Dark mode
const themeButtons = [
  document.getElementById("themeToggle"),
  document.getElementById("themeToggleMobile")
];

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains("dark");
  themeButtons.forEach(btn => {
    if (btn) btn.textContent = isDark ? "☀️" : "🌙";
  });
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}
updateThemeIcon();

themeButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
  });
});

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobileMenu a").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});

// Reveal-on-scroll animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
