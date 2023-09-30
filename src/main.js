import Typewriter from "typewriter-effect/dist/core";
import KUTE from "kute.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

let numUserEnterTerminal = 0;
let terminalPromptFullyDisplay = false;

const tween = KUTE.fromTo(
  "#blob1",
  { path: "#blob1" },
  { path: "#blob2" },
  { repeat: 999, duration: 3000, yoyo: true }
)

tween.start();

const isInViewport = (element) => {
  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
};

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

document.addEventListener("scroll", () => {
  let terminal = document.getElementById("terminal-wrapper");

  if (isInViewport(terminal)) {
    if (terminalPromptFullyDisplay === false) {
      new Typewriter("#terminal-commander", {
        strings: "gcc -std=c11 -Wall -Wextra -pedantic about-nathan.c -o nathan.out",
        delay: 50,
        autoStart: true,
      });
      terminalPromptFullyDisplay = true;
    }
    document.addEventListener("keyup", handleEnterTerminal);
  } else {
    document.removeEventListener("keyup", handleEnterTerminal);
  }
});

gsap.registerPlugin(ScrollTrigger);

let tlFeaturedCards = gsap.timeline({
  scrollTrigger: {
    trigger: "#about-section",
    start: "85% center",
    end: "130% 25%",
    scrub: true,
    markers: true
  }
});

tlFeaturedCards.from(".project-card", {
  opacity: 0,
  stagger: {
    each: 1,
    ease: "power2.outIn"
  }
});

// Smooth scroll
const lenis = new Lenis();

lenis.on('scroll', (e) => {
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);