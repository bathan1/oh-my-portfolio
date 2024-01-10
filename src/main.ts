import Typewriter from "typewriter-effect/dist/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    } 
  })
};

const projectsIo = new IntersectionObserver(active);
appearProjects.forEach(e => projectsIo.observe(e));

function trackMouse(event) {

  document.body.style.setProperty(
    '--cursorXPos',
    `${event.clientX}px`
  );
  document.body.style.setProperty(
    '--cursorYPos',
    `${event.clientY}px`
  );
}

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', trackMouse);
}

document.addEventListener("DOMContentLoaded", () => {
  const numImages = 7;
  const minimap = document.querySelector(".minimap .preview");
  const imageContainer = document.querySelector(".images");

  const getRandomLeft = () => {
      const values = [-1, -0.5, 0, 0.5, 1];
      return values[Math.floor(Math.random() * values.length)].toString() + "rem";
  }

  minimap!.innerHTML = "";
  imageContainer!.innerHTML = "";

  let activeThumbnail: null | HTMLDivElement = null;

  for (let i = 1; i <= numImages; i++) {
    const randomLeft = getRandomLeft();
    const imagePath = `./img${i}.png`;

    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.className = "img-thumbnail";
    thumbnailDiv.style.left = randomLeft;
    const imgThumbnail = document.createElement("img");
    imgThumbnail.src = imagePath;
    thumbnailDiv.appendChild(imgThumbnail);
    minimap!.appendChild(thumbnailDiv);
    
    const imgDiv = document.createElement("div");
    imgDiv.className = "img";
    const imgFull = document.createElement("img");
    imgFull.src = imagePath;

    // Need BioMatch image to start from left
    if (i === 1) {
      imgThumbnail.classList.add("left-image");
      imgFull.classList.add("left-image");
    }

    imgDiv.appendChild(imgFull);
    imageContainer!.appendChild(imgDiv);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: imgDiv,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        if (self.isActive) {
          if (activeThumbnail && activeThumbnail !== thumbnailDiv) {
            animateThumbnail(activeThumbnail, false);
          }

          animateThumbnail(thumbnailDiv, true);
          activeThumbnail = thumbnailDiv;
        } else if (activeThumbnail === thumbnailDiv) {
            animateThumbnail(thumbnailDiv, false);
        }
      }
    });
  }

  const animateThumbnail = (thumbnail: HTMLDivElement, isActive: boolean) => {
    gsap.to(thumbnail, {
    border: isActive ? "1px solid #fff" : "none",
    opacity: isActive ? 1 : 0.5,
    scale: isActive ? 1.3 : 1,
    zIndex: isActive ? 10000 : 1,
    duration: 0.3
    });
  }
});
