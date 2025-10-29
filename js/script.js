// 🎊 Confetti animation
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

function fitCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
fitCanvas();

const confettiPieces = [];
const CONFETTI_BASE = 200;
for (let i = 0; i < CONFETTI_BASE; i++) {
  confettiPieces.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 50,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    speed: 1
  });
}

let confettiSpeedMultiplier = 1;

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.ellipse(p.x, p.y, p.r, p.r / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiPieces.forEach((p) => {
    p.y += (Math.cos(p.d) + 2) * p.speed * confettiSpeedMultiplier;
    p.x += Math.sin(p.d) * 0.6;
    if (p.y > confettiCanvas.height + 10) {
      p.y = -10 - Math.random() * 40;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

const confettiInterval = setInterval(drawConfetti, 20);

// 🎵 Background Music (file path corrected to match workspace filename)
const music = new Audio("music/birthday_song.mp3.mp3");
music.loop = true;
const btn = document.getElementById("musicBtn");

btn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    btn.textContent = "⏸ Pause Music";
    btn.setAttribute('aria-pressed', 'true');
    confettiSpeedMultiplier = 1.4; // more energetic confetti while music plays
  } else {
    music.pause();
    btn.textContent = "🎵 Play Music";
    btn.setAttribute('aria-pressed', 'false');
    confettiSpeedMultiplier = 1;
  }
});

// Surprise button triggers a short confetti burst
const surpriseBtn = document.getElementById('surpriseBtn');
surpriseBtn && surpriseBtn.addEventListener('click', () => {
  // add temporary burst pieces
  const extras = 120;
  for (let i = 0; i < extras; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -Math.random() * 200,
      r: Math.random() * 8 + 3,
      d: Math.random() * 50,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      speed: 1.6
    });
  }
  // remove the extras after a short while
  setTimeout(() => {
    confettiPieces.splice(confettiPieces.length - extras, extras);
  }, 4200);
});

// Lightbox for gallery images
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', (e) => {
    e.preventDefault();
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || 'Photo';
    lightboxModal.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightboxModal.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
lightboxModal && lightboxModal.addEventListener('click', (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Responsive canvas resize
window.addEventListener("resize", () => {
  fitCanvas();
});
