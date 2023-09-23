// Load the particles
document.addEventListener("DOMContentLoaded", () => {
  particlesJS.load("particles-js", "../assets/particles.json");
});

// Get the fade in animation (from FireShip)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-fade");
    } else {
      entry.target.classList.remove("show-fade");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden-fade");
hiddenElements.forEach((element) => observer.observe(element));
