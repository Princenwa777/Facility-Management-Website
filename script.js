// Wait until the DOM is loaded to prevent null errors
document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.main-menu');
  const menuLinks = document.querySelectorAll('.main-menu a');

  if (!hamburger || !menu) return;

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close menu when any link is clicked (mobile only)
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });

  // Close menu if user clicks outside (mobile only)
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove('open');
    }
  });

});



// ===== Fade Carousel =====
const slides = document.querySelectorAll(".slide");
let index = 0;

// show first slide
slides[index].classList.add("active");

setInterval(() => {
  // hide current slide
  slides[index].classList.remove("active");

  // move to next
  index = (index + 1) % slides.length;

  // show next slide
  slides[index].classList.add("active");
}, 5000); // changes every 5 seconds


// Slide-up animation on page load
window.addEventListener("load", () => {
  document.querySelector(".hero-text").classList.add("animate-up");
  document.querySelector(".hero-button").classList.add("animate-up");
});


const video = document.getElementById("myVideo");
const playPause = document.getElementById("playPause");
const volumeBtn = document.getElementById("volumeBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const menuBtn = document.getElementById("menuBtn");
const dropdown = document.querySelector(".dropdown");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const progressBar = document.getElementById("progressBar");
const progressFilled = document.querySelector(".progress-filled");
progressBar.value = 0;
progressFilled.style.width = "0%";

/* PLAY / PAUSE */
playPause.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPause.textContent = "⏸";
  } else {
    video.pause();
    playPause.textContent = "▶️";
  }
});

/* VOLUME MUTE/UNMUTE */
volumeBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  volumeBtn.textContent = video.muted ? "🔇" : "🔊";
});

/* FULLSCREEN */
fullscreenBtn.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});

/* MENU (⋮) */
menuBtn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

menuBtn.addEventListener("touchstart", () => {
  dropdown.classList.toggle("show");
});

/* PLAYBACK SPEED */
document.querySelectorAll(".menu-item").forEach(button => {
  button.addEventListener("click", () => {
    let speed = button.getAttribute("data-speed");
    video.playbackRate = speed;
    dropdown.classList.remove("show");
  });
});

/* PICTURE IN PICTURE */
document.querySelector(".pip-btn").addEventListener("click", async () => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await video.requestPictureInPicture();
    }
  } catch (err) {
    console.log("PiP failed:", err);
  }
});

/* SET VIDEO DURATION */
video.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(video.duration);
});

/* UPDATE CURRENT TIME & BAR */
video.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(video.currentTime);

  let progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.value = progressPercent;
  progressFilled.style.width = progressPercent + "%";
});

/* FORMAT TIME */
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

/* SEEK VIDEO */
progressBar.addEventListener("input", () => {
  let seekTime = (progressBar.value / 100) * video.duration;
  video.currentTime = seekTime;
  progressFilled.style.width = progressBar.value + "%";
});



const totalPages = 5;
let currentPage = 1;

// Detect current page from URL
const url = window.location.href;
const match = url.match(/page(\d+)\.html$/);
if (match) currentPage = parseInt(match[1], 10);

function renderPagination() {
  const container = document.getElementById('pagination');
  container.innerHTML = '';

  // Previous button
  const prev = document.createElement('a');
  prev.href = currentPage > 1 ? `page${currentPage - 1}`.html : '#';
  prev.textContent = '« Previous';
  if (currentPage === 1) prev.style.pointerEvents = 'none';
  container.appendChild(prev);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      const page = document.createElement('a');
      page.href = `page${i}.html`;
      page.textContent = i;
      if (i === currentPage) page.classList.add('active');
      container.appendChild(page);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const dots = document.createElement('span');
      dots.textContent = '…';
      container.appendChild(dots);
    }
  }

  // Next button
  const next = document.createElement('a');
  next.href = currentPage < totalPages ? `page${currentPage + 1}.html` : '#';
  next.textContent = 'Next »';
  if (currentPage === totalPages) next.style.pointerEvents = 'none';
  container.appendChild(next);
}

// Initial render
renderPagination();



const message = document.getElementById("message");
const charCounter = document.getElementById("charCounter");

message.addEventListener("input", () => {
  charCounter.textContent = `${message.value.length}/180`;
});


const revealElements = document.querySelectorAll('.scroll-reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150; // how far from bottom before reveal

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active'); // trigger animation
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // reveal visible elements on load