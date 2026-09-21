const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const cursorGlow = document.querySelector(".cursor-glow");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close mobile menu after selecting a section
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Dark mode with localStorage
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

// Reveal elements while scrolling
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Highlight the current navigation item
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

// Cursor glow on desktop
document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

// Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();
