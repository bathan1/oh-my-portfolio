// make clicking hamburger icon slide logo out
const hamburgerSvg= document.getElementById("hamburger-svg");
hamburgerSvg.addEventListener("click", (e) => {
  const logoDiv = document.getElementById("logo-div");
  if (!logoDiv.classList.contains("logo-slideout")) {
    logoDiv.classList.remove("logo-slidein");
    logoDiv.classList.add("logo-slideout");

    const navListContainer = document.getElementById("nav-list-container");
    navListContainer.classList.remove("nav-container-fadeout");
    navListContainer.classList.add("nav-container-fadein");
  } else {
    const navListContainer = document.getElementById("nav-list-container");
    navListContainer.classList.remove("nav-container-fadein");
    navListContainer.classList.add("nav-container-fadeout");

    logoDiv.classList.remove("logo-slideout");
    logoDiv.classList.add("logo-slidein");
  }
  
  hamburgerSvg.classList.toggle("opened");
});