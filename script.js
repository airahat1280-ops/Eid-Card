/* ================= star and moon bg ================= */
const starsContainer = document.getElementById("stars");

for (let i = 0; i < 60; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  let size = Math.random() * 3 + 1;

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.width = size + "px";
  star.style.height = size + "px";

  // Color (gold or white)
  star.style.background =
    size > 2.5 ? "hsl(45, 97%, 54%)" : "hsl(210, 40%, 98%)";

  // Animation variables
  star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
  star.style.setProperty("--delay", Math.random() * 5 + "s");

  starsContainer.appendChild(star);
}

/* ================= SLIDESHOW ================= */
let slides = document.querySelectorAll(".slide");
let index = 0;
let dots = document.querySelectorAll(".dots span");

function showSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active-dot"));

  slides[index].classList.add("active");
  dots[index].classList.add("active-dot");

  index++;
  if (index >= slides.length) {
    index = 0;
  }
}
/* Change slide every 4 seconds */
setInterval(showSlide, 4000);

function goToSlide(n) {
  index = n;
  showSlide();
}

/* ================= GIFT GAME ================= */
const gift = document.getElementById("gift");
const feedback = document.getElementById("feedback");
const counter = document.getElementById("counter");

let clicks = 0;

const messages = ["Try again! 🎁", "Almost there! ✨"];

/* Move gift randomly */
function moveGift() {
  let x = 15 + Math.random() * 70;
  let y = 15 + Math.random() * 60;

  gift.style.left = x + "%";
  gift.style.top = y + "%";
}

/* Auto move */
setInterval(moveGift, 2500);

/* Click logic */
gift.addEventListener("click", () => {

  if (gift.classList.contains("open")) return;

  clicks++;
  counter.innerText = `Clicks: ${clicks}/3`;

  /* Shake */
  gift.classList.add("shake");
  setTimeout(() => gift.classList.remove("shake"), 500);

  if (clicks >= 3) {
    feedback.innerText = "🎉 Opening!";
    feedback.style.display = "block";

    gift.classList.add("open");

    setTimeout(() => {
      // You can trigger your final screen here
      showFinalScreen();
    }, 1000);

  } else {
    feedback.innerText = messages[clicks - 1];
    feedback.style.display = "block";

    moveGift();

    setTimeout(() => {
      feedback.style.display = "none";
    }, 1500);
  }
});

/* 🎉 SHOW FINAL SCREEN */
function showFinalScreen() {
  const final = document.getElementById("final-screen");
  final.classList.add("show");

  createConfetti();
  setInterval(createConfetti, 1000); // continuous
}

/* 🎊 CONFETTI */
function createConfetti() {
  const container = document.getElementById("confetti-container");

  const colors = [
    "hsl(45, 97%, 54%)",
    "hsl(45, 97%, 70%)",
    "hsl(210, 40%, 98%)",
    "hsl(350, 89%, 60%)",
    "hsl(199, 89%, 60%)"
  ];

  for (let i = 0; i < 20; i++) {  // smaller batch each time
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    const size = 6 + Math.random() * 8;

    piece.style.left = Math.random() * 100 + "%";
    piece.style.width = size + "px";
    piece.style.height = size * 0.6 + "px";
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    const duration = 2 + Math.random() * 3;
    const delay = Math.random() * 2;

    piece.style.animation = `confetti-fall ${duration}s ease-in ${delay}s forwards`;

    container.appendChild(piece);

    /* 🔥 REMOVE after animation (important!) */
    setTimeout(() => {
      piece.remove();
    }, (duration + delay) * 1000);
  }
}