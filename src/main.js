import Typewriter from "typewriter-effect/dist/core";

new Typewriter("#terminal-commander", {
  strings: "gcc -std=c11 -Wall -Wextra -pedantic about-nathan.c",
  delay: 50,
  autoStart: true,
})