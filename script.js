let index = 0;

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function nextSlide() {
  index++;
  if (index >= slides.length) index = 0;
  showSlide(index);
}

function goToSlide(i) {
  index = i;
  showSlide(i);
}

// auto play
setInterval(nextSlide, 4000);
document.getElementById("proceedBtn").addEventListener("click", function () {
    document.getElementById("bottom_of_page").scrollIntoView({
        behavior: "smooth"
    });
});

const agreeCheck = document.getElementById("agreeCheck");
const agreementBox = document.querySelector(".agreement-box");

const proceedBtn = document.getElementById("proceedBtn");
const learnBtn = document.getElementById("btn_disabled");
const shopBtn = document.getElementById("btn_di");
const communityBtn = document.getElementById("btn_dis");

const buttons = [proceedBtn, learnBtn, shopBtn, communityBtn];

// check saved state
let isAgreed = localStorage.getItem("agreed") === "true";

// apply on load
if (isAgreed) {
    agreeCheck.checked = true;
    agreementBox.classList.add("hide");   // 👈 HIDE IT
    setLocked(false);
} else {
    setLocked(true);
}

// checkbox change
agreeCheck.addEventListener("change", function () {

    if (this.checked) {
        localStorage.setItem("agreed", "true");

        agreementBox.classList.add("hide"); // 👈 DISAPPEAR

        setLocked(false);
    } else {
        localStorage.setItem("agreed", "false");

        agreementBox.classList.remove("hide"); // show again if unchecked

        setLocked(true);
    }
});

// lock system
function setLocked(state) {

    buttons.forEach(btn => {

        if (!btn) return;

        if (state) {
            btn.classList.add("disabled");
            btn.addEventListener("click", blockClick);
        } else {
            btn.classList.remove("disabled");
            btn.removeEventListener("click", blockClick);
        }
    });
}

// BLOCK CLICK + EFFECTS
function blockClick(e) {
    e.preventDefault();

    // shake button
    e.target.classList.add("shake");

    setTimeout(() => {
        e.target.classList.remove("shake");
    }, 350);

    // glow checkbox container
    agreementBox.classList.add("glow");

    setTimeout(() => {
        agreementBox.classList.remove("glow");
    }, 600);
}