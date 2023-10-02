import Typewriter from "typewriter-effect/dist/core";
import Lenis from "@studio-freight/lenis";

let numUserEnterTerminal = 0;
let terminalPromptFullyDisplay = false;


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
      document.getElementById("right-about-card").style.opacity = "1";
      document.getElementById("right-about-card").style.height = "auto";
      document.getElementById("terminal-flex").style.gap = "3rem";

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

const scrollDownButton = document.getElementById("hero-bottom-half");
scrollDownButton.addEventListener("click", (e) => {
  lenis.scrollTo(document.getElementById("about-section"));
});

const scrollBackUpButton = document.getElementById("footer-animation");
scrollBackUpButton.addEventListener("click", (e) => {
  lenis.scrollTo(document.getElementById("hero-section"));
});