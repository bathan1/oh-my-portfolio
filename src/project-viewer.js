import TypeWriter from "typewriter-effect/dist/core";

let currentProject = null;
let numCommandsRun = 0;

const terminalCommands = {
  hw1: "gcc hw1.c"
}

const terminalTypeWriter = new TypeWriter("#terminal-emulator", {
  autoStart: true,
  delay: 25
});

terminalTypeWriter.start();

const projectForm = document.getElementById("project-form");
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedProject = document.getElementById("project-dropdown").value;
  handleProjectSubmit(selectedProject);
});

function handleProjectSubmit(selectedProject) {
  currentProject = selectedProject;
  switch (selectedProject) {
    case "ip-hw1":
      numCommandsRun = 0;
      terminalTypeWriter.deleteAll();
      terminalTypeWriter.changeDelay(50)
      terminalTypeWriter.typeString(terminalCommands.hw1);
      terminalTypeWriter.start();
      break;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    switch (currentProject) {
      case "ip-hw1":
        if (numCommandsRun === 0) {
          terminalTypeWriter.deleteAll();
          terminalTypeWriter.typeString("./a.out")
          terminalTypeWriter.start();
          numCommandsRun++;
        } else if (numCommandsRun === 1) {
          
        }
    }
  }
});