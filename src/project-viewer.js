import TypeWriter from "typewriter-effect/dist/core";

let currentProject = null;
const makeCommandC = "gcc -g -std=c99 -pedantic -Wall -Wextra";
const makeCommandCpp = "g++ -g -std=c++11 -pedantic -Wall -Wextra";
let numCommandsRun = 0;

const terminalCommands = {
  hw1: "gcc hw1.c",
  hw3: {
    cmd1: `${makeCommandC} -c print_functions.c`,
    cmd2: `${makeCommandC} -c maze.c`,
    cmd3: `${makeCommandC} -c hw3.c`,
    cmd4: `gcc -o hw3 hw3.o maze.o print_functions.o`
  },
  midterm: {
    cmd1: `${makeCommandC} -c img_processing.c`,
    cmd2: `${makeCommandC} -c ppm_io.c`,
    cmd3: `${makeCommandC} -o $@ checkboard.o ppm_io.o`,
    cmd4: `${makeCommandC} -c project.c`,
    cmd5: `${makeCommandC} -o project project.o ppm_io.o img_processing.o`
  },
  hw5: {
    cmd1: `${makeCommandCpp} -c db_functions.cpp -o db_functions.o`,
    cmd2: `${makeCommandCpp} -c phone_db.cpp -o phone_db.o`,
    cmd3: `${makeCommandCpp} -o phone_db phone_db.o db_functions.o`,
  },
  hw7: "make all",
};

const terminalTypeWriter = new TypeWriter("#terminal-emulator", {
  autoStart: true,
  delay: 25,
});

terminalTypeWriter.start();

const runButton = document.getElementById("run-button");
runButton.addEventListener("click", (e) => {
  e.preventDefault();

  const selectedProject = document.getElementById("project-dropdown").value;
  handleProjectSubmit(selectedProject);
});

function handleProjectSubmit(selectedProject) {
  currentProject = selectedProject;
  switch (selectedProject) {
    case "ip-hw1":
      numCommandsRun = 0;
      terminalTypeWriter.deleteAll(1);
      terminalTypeWriter.changeDelay(50);
      terminalTypeWriter.typeString(terminalCommands.hw1);
      terminalTypeWriter.start();
      break;
    case "ip-hw3":
      numCommandsRun = 0;
      terminalTypeWriter.deleteAll(1);
      terminalTypeWriter.changeDelay(25);
      terminalTypeWriter.typeString(terminalCommands.hw3.cmd1);
      terminalTypeWriter.start();
      break;
    case "ip-midterm":
      numCommandsRun = 0;
      terminalTypeWriter.deleteAll(1);
      terminalTypeWriter.changeDelay(25);
      terminalTypeWriter.typeString(terminalCommands.midterm.cmd1);
      terminalTypeWriter.start();
      break;
    case "ip-hw5":
      numCommandsRun = 0;
      terminalTypeWriter.deleteAll(1);
      terminalTypeWriter.changeDelay(25);
      terminalTypeWriter.typeString(terminalCommands.hw5.cmd1);
      terminalTypeWriter.start();
      break;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    switch (currentProject) {
      case "ip-hw1":
        terminalTypeWriter.deleteAll(1);
        terminalTypeWriter.typeString("./a.out");
        terminalTypeWriter.start();
        break;
      case "ip-hw3":
        if (numCommandsRun === 0) {
          numCommandsRun++;
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.hw3.cmd2);
          terminalTypeWriter.start();
        } else if (numCommandsRun === 1) {
          numCommandsRun++;
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.hw3.cmd3);
          terminalTypeWriter.start();
        } else if (numCommandsRun === 2) {
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.hw3.cmd4);
          terminalTypeWriter.start();
        } 
        break;
      case "ip-midterm":
        if (numCommandsRun === 0) {
          numCommandsRun++;
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.midterm.cmd2);
          terminalTypeWriter.start();
        } else if (numCommandsRun === 1) {
          numCommandsRun++;
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.midterm.cmd3);
          terminalTypeWriter.start();
        } else if (numCommandsRun === 2) {
          numCommandsRun++;
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.midterm.cmd4);
          terminalTypeWriter.start();
        } else if (numCommandsRun === 3) {
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.midterm.cmd5);
          terminalTypeWriter.start();
        }
        break;
      case "ip-hw5":
        if (numCommandsRun === 0) {
          numCommandsRun++;
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.hw5.cmd2);
          terminalTypeWriter.start();
        } else if (numCommandsRun === 1) {
          terminalTypeWriter.deleteAll(1);
          terminalTypeWriter.typeString(terminalCommands.hw5.cmd3);
          terminalTypeWriter.start();
        } 
        break;
      case "ip-hw7":
        terminalTypeWriter.deleteAll();
        terminalTypeWriter.typeString("./project");
        terminalTypeWriter.start();
        break;
      default: 
        return;
    }
  }
});
