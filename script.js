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

// Particle background
(function () {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  let particles = [];
  const COUNT = 70;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", () => {
    resize();
    initParticles();
  });

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(1, 3),
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3),
      alpha: randomBetween(0.2, 0.7),
    };
  }

  function initParticles() {
    particles = Array.from({ length: COUNT }, createParticle);
  }
  initParticles();

  function drawLine(p1, p2, dist, maxDist) {
    const opacity = (1 - dist / maxDist) * 0.25;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = isDark()
      ? `rgba(96,165,250,${opacity})`
      : `rgba(37,99,235,${opacity})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dotColor = isDark() ? "rgba(96,165,250," : "rgba(37,99,235,";
    const maxDist = 130;

    particles.forEach((p, i) => {
      // move
      p.x += p.vx;
      p.y += p.vy;

      // wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor + p.alpha + ")";
      ctx.fill();

      // draw connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          drawLine(p, q, dist, maxDist);
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Re-draw particles on theme toggle so colors update immediately
  themeButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      // colors update automatically on next frame since isDark() is called per frame
    });
  });
})();
