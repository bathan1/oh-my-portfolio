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

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Remove 'active' class from all links
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add 'active' class to the clicked link
    link.classList.add("active");
  });
});

const sections = document.querySelectorAll("section");
function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Function to update active navigation item
function updateActiveNavItem() {
  if (window.scrollY === 0) {
    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[0].classList.add("active"); // Assuming the first link is "About"
    return;
  }

  sections.forEach((section, index) => {
    if (isInView(section)) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
}

// Event listener for scroll
window.addEventListener("scroll", updateActiveNavItem);
