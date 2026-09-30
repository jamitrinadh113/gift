const pages = [...document.querySelectorAll(".page")];
const $ = (id) => document.getElementById(id);
const unlockDateTime = "2026-10-01T00:00:00";
const unlockAt = new Date(unlockDateTime).getTime();
let countdownTimer;

function updateCountdown() {
  const remaining = Math.max(0, unlockAt - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  $("countdownDays").textContent = Math.floor(totalSeconds / 86400);
  $("countdownHours").textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
  $("countdownMinutes").textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  $("countdownSeconds").textContent = String(totalSeconds % 60).padStart(2, "0");

  if (remaining === 0) {
    clearInterval(countdownTimer);
    document.body.classList.remove("is-locked");
    $("countdownGate").remove();
  }
}

updateCountdown();
if (document.body.classList.contains("is-locked")) {
  countdownTimer = setInterval(updateCountdown, 1000);
}
function showPage(n) {
  pages.forEach((p, i) => p.classList.toggle("active", i === n - 1));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function makeParticles() {
  const box = $("particles");
  const symbols = ["♥", "✦", "♡", "✧", "·", "+", "◇"];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement("span");
    el.className = "particle";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = (12 + Math.random() * 22) + "px";
    el.style.animationDuration = (12 + Math.random() * 10) + "s";
    el.style.animationDelay = (-Math.random() * 20) + "s";
    el.style.animationTimingFunction = Math.random() > .5 ? "ease-in-out" : "linear";
    box.appendChild(el);
  }
}
makeParticles();

/* Music */
const music = $("music");
$("musicBtn").addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => { });
    $("musicBtn").textContent = "♫";
  } else {
    music.pause();
    $("musicBtn").textContent = "🔇";
  }
});
document.addEventListener("click", () => {
  if (music.paused) music.play().catch(() => { });
}, { once: true });

/* Page 1 */
$("yesBtn").addEventListener("click", () => showPage(2));
$("noBtn").addEventListener("click", () => {
  $("noMessage").textContent = "Nice try 😜… the surprise is waiting for you! Click YES 💙";
  $("noBtn").animate(
    [{ transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }],
    { duration: 350 }
  );
});

/* Page 2 */
const candles = [...document.querySelectorAll(".candle")];
const clickedWords = new Set();

candles.forEach((candle) => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains("off")) return;
    candle.classList.add("off");
    const word = candle.dataset.word;
    clickedWords.add(word);

    const tag = document.createElement("span");
    tag.className = "word";
    tag.textContent = word;
    $("wishWords").appendChild(tag);

    const remaining = candles.length - clickedWords.size;
    $("candleHint").textContent = remaining
      ? `${remaining} candle${remaining === 1 ? "" : "s"} remaining…`
      : "Your wish is ready! Make it a beautiful one. ✨";

    if (remaining === 0) $("toGame").classList.remove("hidden");
  });
});
$("toGame").addEventListener("click", () => showPage(3));

/* Page 3 game */
let score = 0, timeLeft = 20, timer = null, gameRunning = false;

$("startGame").addEventListener("click", startGame);

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  score = 0; timeLeft = 20;
  $("score").textContent = score;
  $("time").textContent = timeLeft;
  $("gameStart").classList.add("hidden");
  spawnTarget();
  timer = setInterval(() => {
    timeLeft--;
    $("time").textContent = timeLeft;
    if (timeLeft <= 0) endGame(false);
  }, 1000);
}

function spawnTarget() {
  if (!gameRunning) return;
  document.querySelectorAll(".target").forEach(e => e.remove());
  const target = document.createElement("button");
  target.className = "target";
  target.textContent = Math.random() > .35 ? "⭐" : "💙";
  target.style.left = (5 + Math.random() * 88) + "%";
  target.style.top = (8 + Math.random() * 78) + "%";
  target.addEventListener("click", () => {
    score++;
    $("score").textContent = score;
    if (score >= 10) {
      endGame(true);
    } else {
      spawnTarget();
    }
  });
  $("gameArea").appendChild(target);
}

function endGame(won) {
  gameRunning = false;
  clearInterval(timer);
  document.querySelectorAll(".target").forEach(e => e.remove());
  if (won) {
    $("winBox").classList.remove("hidden");
  } else {
    $("gameStart").classList.remove("hidden");
    $("gameStart").querySelector("span").textContent = "⏰";
    $("startGame").textContent = "Try Again";
  }
}
$("toMemories").addEventListener("click", () => showPage(4));

/* Page 4 memories */
const memories = [
  ["assets/photos/memory-1.jpeg", "A moment that can be a first single in my Galary. 💙"],
  ["assets/photos/memory-2.jpeg", "We had very less moments in our journey to celebrate but definately this is the one. ✨"],
  ["assets/photos/memory-3.jpeg", "I dont know Why we went to beach on that day, But its beautiful. 😄"],
  ["assets/photos/memory-4.jpeg", "Helmet Enduku Dobbesavo telidu. 🌤️"],
  ["assets/photos/memory-5.jpeg", "Chi chi, evariko Flower icchesukonii Thu Thu Thu. 💙"]
];
let memoryIndex = 0;
$("memoryTotal").textContent = memories.length;

function renderMemory() {
  const img = $("memoryImage");
  img.parentElement.classList.remove("shine");
  void img.parentElement.offsetWidth;
  img.src = memories[memoryIndex][0];
  img.alt = memories[memoryIndex][1];
  $("memoryCaption").textContent = memories[memoryIndex][1];
  $("memoryNumber").textContent = memoryIndex + 1;
  img.parentElement.classList.add("shine");

  if (memoryIndex === memories.length - 1) {
    $("nextMemory").classList.add("hidden");
    $("memoryEnd").classList.remove("hidden");
  }
}
$("nextMemory").addEventListener("click", () => {
  if (memoryIndex < memories.length - 1) {
    memoryIndex++;
    renderMemory();
  }
});
$("toFinal").addEventListener("click", () => showPage(5));

/* Page 5 */
$("envelope").addEventListener("click", () => {
  $("envelope").classList.add("open");
  setTimeout(() => {
    $("envelopeWrap").classList.add("hidden");
    $("letter").classList.remove("hidden");
    celebrate();
  }, 850);
});

function celebrate() {
  const symbols = ["🎉", "✨", "💙", "🎈", "⭐", "💐"];
  for (let i = 0; i < 45; i++) {
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + "%";
    p.style.bottom = "5%";
    p.style.fontSize = (12 + Math.random() * 22) + "px";
    p.style.animationDuration = (3 + Math.random() * 4) + "s";
    $("particles").appendChild(p);
    setTimeout(() => p.remove(), 7500);
  }
}
