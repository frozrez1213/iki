// =========================
// Helper Functions
// =========================
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));


// =========================
// Mobile Navigation Toggle (FIX)
// =========================
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menuToggle");
    const nav = document.querySelector(".top-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
    });
});



// =========================
// Diary Chapters (Modal)
// =========================
const chapters = [
  {
    title: "Chapter 01 — The Night We Meet.",
    preview: "The moment everything began.",
    content: `The first time I saw her, something felt quietly different... Kamu beda banget...`
  },
  {
    title: "Chapter 02 — How Much Imma Fall In Love With You",
    preview: "Soft conversations, warm silence.",
    content: `In the soft hours of the night, her voice felt warmer than the world...`
  }
];

// modal logic (tidak berubah)


// =========================
// Love Data Bar Animation
// =========================
(function animateBars() {
  const panels = document.querySelectorAll(".data-panel, .panel");
  if (!panels.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".fill");
        fills.forEach(f => {
          const v = f.dataset.value || f.dataset.val || 0;
          f.style.width = v + "%";
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  panels.forEach(panel => observer.observe(panel));
})();


// =========================
// COUNTDOWN
// =========================

function countdown(targetDate, elementId) {
  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    const el = document.getElementById(elementId);
    if (!el) return;

    if (diff <= 0) {
      el.textContent = "Today ✦";
      return;
    }

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff / (1000*60*60)) % 24);
    const m = Math.floor((diff / (1000*60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }

  update();
  setInterval(update, 1000);
}

// APPLY COUNTDOWN
countdown(new Date("July 12, 2025 00:00:00").getTime(), "cd-her");
countdown(new Date("July 08, 2025 00:00:00").getTime(), "cd-anniv");
countdown(new Date("March 09, 2025 00:00:00").getTime(), "cd-me");


// =========================
// ABOUT HER — SLIDER FIXED
// =========================

const sliderTrack = document.querySelector(".slider-track");
const sliderImages = document.querySelectorAll(".slider-track img");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

let slideIndex = 0;
const slideWidth = 350; // SESUAI CSS
const slideCount = sliderImages.length;

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

btnNext?.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
});

btnPrev?.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
});

// === FLOATING MUSIC PLAYER === //

const audio = document.getElementById("playerAudio");
const toggleBtn = document.getElementById("musicToggle");
const player = document.getElementById("floatingPlayer");
const eqBars = document.querySelectorAll(".eq div");

let playing = false;

// Play / Pause
toggleBtn.addEventListener("click", () => {
  if (!playing) {
    audio.play();
    toggleBtn.textContent = "⏸";
    eqBars.forEach(bar => bar.style.animationPlayState = "running");
    playing = true;
  } else {
    audio.pause();
    toggleBtn.textContent = "▶";
    eqBars.forEach(bar => bar.style.animationPlayState = "paused");
    playing = false;
  }
});

// Auto-hide player after 5 seconds
let hideTimeout;

function resetHideTimer() {
  clearTimeout(hideTimeout);
  player.classList.remove("hidden");
  hideTimeout = setTimeout(() => {
    player.classList.add("hidden");
  }, 5000);
}

resetHideTimer();

document.addEventListener("mousemove", resetHideTimer);
document.addEventListener("touchstart", resetHideTimer);

