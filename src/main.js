document.addEventListener("DOMContentLoaded", () => {
  particlesJS.load("particles-container", "../assets/particles.json");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show-fade");
    } else {
      entry.target.classList.remove("show-fade");
    }
  });
})

const hiddenElements = document.querySelectorAll(".hidden-fade");
hiddenElements.forEach((element) => observer.observe(element));