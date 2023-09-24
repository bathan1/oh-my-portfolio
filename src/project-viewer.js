import TypeWriter from "typewriter-effect/dist/core";

let currentProject = "hw1";
let numCommandsRun = 0;


const emulatorCommands = {
  hw1: "gcc hw1.c",
  hw2: "gcc -g -std=c99 -pedantic -Wall -Wextra -c print_functions.c"
}


const terminalTypewriter = new TypeWriter("#ip-project-terminal", {
  autoStart: true,
  delay: 75,
});

let command = "gcc hw1.c";
terminalTypewriter.typeString(command);
terminalTypewriter.start();

const title = document.getElementById("project-title");
const projectSelect = document.getElementById("project-select");
projectSelect.addEventListener("change", () => {
  switch (projectSelect.value) {
    case "vending-machine":
      currentProject = "hw1";
      numCommandsRun = 0;
      title.textContent = "Vending Machine in C";
      terminalTypewriter.deleteAll();
      terminalTypewriter.typeString(emulatorCommands.hw1);
      terminalTypewriter.start();
      break;
    case "cl-maze":
      currentProject = "hw3";
      numCommandsRun = 0;
      title.textContent = "Maze Solver on the command line in C";
      terminalTypewriter.deleteAll();
      terminalTypewriter.changeDelay(25);
      terminalTypewriter.typeString(emulatorCommands.hw2);
      terminalTypewriter.start();
      break;
    case "midterm":
      title.textContent = "Photoshop on the command line in C";
      break;
    case "phone database":
      title.textContent = "Phone Database in C++";
      break;
    case "ctries":
      title.textContent = "Trie implementation in C++";
      break;
    case "final":
      title.textContent = "Function visualizer in C++";
      break;
  }
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    switch (currentProject) {
      case "hw1":
        if (numCommandsRun === 0) {
          terminalTypewriter.deleteAll();
          terminalTypewriter.typeString("./a.out");
          terminalTypewriter.start();
          numCommandsRun++;
        } else if (numCommands === 1) {

        } 
    }
  }
});

let wasmExports;

let wasmMemory = new WebAssembly.Memory({initial: 256, maximum: 256});

let wasmTable = new WebAssembly.Table({
  "initial": 1,
  "maximum": 1,
})

async function loadWasm() {
  let response = await fetch("./wasm/ip-hw1.out.wasm");
  let bytes = await response.arrayBuffer();
  let wasmObject = await WebAssembly.instantiate(bytes, info);
  wasmExports = wasmObject.instance.exports;
}