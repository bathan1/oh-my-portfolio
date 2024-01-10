import Typewriter from "typewriter-effect/dist/core";

let numUserEnterTerminal = 0;
let terminalPromptFullyDisplay = false;

const handleEnterTerminal = (e) => {
  if (e.key === "Enter" || e.type === "touchstart") {
    if (numUserEnterTerminal === 0) {
      document.getElementById("terminal-commander").textContent = "";
      new Typewriter("#terminal-commander", {
        strings: "./nathan.exe",
        delay: 50,
        autoStart: true
      });
      numUserEnterTerminal++;
    }  else if (numUserEnterTerminal === 1) {

      const terminalContainer = document.getElementById("terminal-container");
      const rightAboutCard = document.getElementById("right-about-card");
      if (window.innerWidth < 768) {
        terminalContainer.style.opacity = "0";
        setTimeout(() => {
          terminalContainer.remove();
          rightAboutCard.style.flexGrow = "1";
          rightAboutCard.style.opacity = "1";
          rightAboutCard.style.height = "100%";
        }, 1000);
      } else {
        document.getElementById("terminal-commander").textContent = "";
        document.getElementById("terminal-flex").style.gap = "3rem";
        rightAboutCard.style.flexGrow = "2";
        rightAboutCard.style.opacity = "1";
        rightAboutCard.style.height = "auto";
      }
      const infoCards = document.querySelectorAll(".info-card");
      infoCards.forEach((card) => {
        card.style.opacity = "1";
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
      if (window.innerWidth < 768) {
        document.getElementById("terminal-flex").addEventListener("touchstart", handleEnterTerminal);
      }
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

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', trackMouse);
}


