import TypeWriter from "typewriter-effect/dist/core";

let currentProject = null;

const terminalCommands = {
  hw1: "gcc hw1.c",
  hw3: "make",
  midterm: "make",
  hw5: "make",
  hw7: "make all",
}

const terminalTypeWriter = new TypeWriter("#terminal-emulator", {
  autoStart: true,
  delay: 25
});

terminalTypeWriter.start();

const projectForm = document.getElementById("project-form");
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  projectForm.querySelector('button[type="submit"]').blur();

  const selectedProject = document.getElementById("project-dropdown").value;
  handleProjectSubmit(selectedProject);
});

function handleProjectSubmit(selectedProject) {
  currentProject = selectedProject;
  switch (selectedProject) {
    case "ip-hw1":
      terminalTypeWriter.deleteAll();
      terminalTypeWriter.changeDelay(50);
      terminalTypeWriter.typeString(terminalCommands.hw1);
      terminalTypeWriter.start();
      break;
    case "ip-hw3":
      terminalTypeWriter.deleteAll();
      terminalTypeWriter.changeDelay(25);
      terminalTypeWriter.typeString(terminalCommands.hw3);
      terminalTypeWriter.start();
      break;
    case "ip-midterm":
      terminalTypeWriter.deleteAll();
      terminalTypeWriter.changeDelay(25);
      terminalTypeWriter.typeString(terminalCommands.hw3);
      terminalTypeWriter.start();
      break;  
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    switch (currentProject) {
      case "ip-hw1":
        terminalTypeWriter.deleteAll();
        terminalTypeWriter.typeString("./a.out")
        terminalTypeWriter.start();
        break;
      case "ip-hw3":
        terminalTypeWriter.deleteAll();
        terminalTypeWriter.typeString("./hw3");
        terminalTypeWriter.start();
        break;
      case "ip-midterm":
        terminalTypeWriter.deleteAll();
        terminalTypeWriter.typeString("./project");
        terminalTypeWriter.start();
        break;
      case "ip-hw5":
        terminalTypeWriter.deleteAll();
        terminalTypeWriter.typeString("./phone_db");
        terminalTypeWriter.start();
        break;
      case "ip-hw7":
        terminalTypeWriter.deleteAll();
        terminalTypeWriter.typeString("./project");
        terminalTypeWriter.start();
        break;
    }
  }
});