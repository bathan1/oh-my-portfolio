import Typewriter from "typewriter-effect/dist/core";
import KUTE from "kute.js";
import Lenis from "@studio-freight/lenis";

let numUserEnterTerminal = 0;
let terminalPromptFullyDisplay = false;

const tween = KUTE.fromTo(
  "#blob1",
  { path: "#blob1" },
  { path: "#blob2" },
  { repeat: 999, duration: 3000, yoyo: true }
);

tween.start();

const handleEnterTerminal = (e) => {
  if (e.key === "Enter") {
    if (numUserEnterTerminal === 0) {
      document.getElementById("terminal-commander").textContent = "";
      new Typewriter("#terminal-commander", {
        strings: "./nathan.exe",
        delay: 50,
        autoStart: true
      });
      numUserEnterTerminal++;
    }  else if (numUserEnterTerminal === 1) {
      document.getElementById("terminal-commander").textContent = "";
      document.getElementById("right-about-card").style.flexGrow = "1";

      const infoCards = document.querySelectorAll(".info-card");
      infoCards.forEach((card) => {
        card.classList.remove("hidden");
        card.classList.add("show");
      })

      numUserEnterTerminal++;
      new Typewriter("#terminal-commander", {
        strings: "",
        delay: 50,
      });
    }
  } 
};


const appearElements = document.querySelectorAll(".appear");
const cb = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview");

      if (entry.target.classList.contains("about-section") && !terminalPromptFullyDisplay) {
        new Typewriter("#terminal-commander", {
          strings: "gcc -std=c11 -Wall -Wextra -pedantic about-nathan.c -o nathan.exe",
          delay: 50,
          autoStart: true,
        });
        terminalPromptFullyDisplay = true;
      }
      document.addEventListener("keyup", handleEnterTerminal);
    } else {
      entry.target.classList.remove("inview");
    }
  });
};
const io = new IntersectionObserver(cb);
appearElements.forEach(e => io.observe(e));

const appearProjects = document.querySelectorAll(".appear-list");
const active = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview-list");
    } else {
      entry.target.classList.remove("inview-list");
    }
  })
};

const projectsIo = new IntersectionObserver(active);
appearProjects.forEach(e => projectsIo.observe(e));

// Smooth scroll
const lenis = new Lenis();

lenis.on('scroll', (e) => {
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    lenis.scrollTo(this.getAttribute('href'));
  });
});

function trackMouse(event) {
  const mainElement = document.querySelector("main");

  mainElement.style.setProperty(
    '--cursorXPos',
    `${event.clientX}px`
  );
  mainElement.style.setProperty(
    '--cursorYPos',
    `${event.clientY}px`
  );
}

document.addEventListener('mousemove', trackMouse);