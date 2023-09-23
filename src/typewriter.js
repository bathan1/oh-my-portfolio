import TypeWriter from "typewriter-effect/dist/core";

const aboutText1 = "I am a current junior studying Computer Science at Johns Hopkins University."
const aboutText2 = " My coding journey began with Java, and I've been expanding";
const aboutText3 = " my programming knowledge ever since, with a particular interest in web development.";
const aboutText4 = " In my free time, I like to play soccer, Overwatch with my friends, or watch TV with my pet dog.";

const typewriter = new TypeWriter("#typewriter", {
  autoStart: true,
  delay: 25,
});

typewriter
  .typeString(aboutText1)
  .pauseFor(300)
  .typeString(aboutText2)
  .typeString(aboutText3)
  .pauseFor(300)
  .typeString(aboutText4);

typewriter.start();