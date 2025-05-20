const canvas = document.getElementById("tohCanvas");
const ctx = canvas.getContext("2d");
let rods = [[], [], []];
let moves = [];
let numDisks = 3;

function startTOH() {
  numDisks = parseInt(document.getElementById("disks").value);
  if (isNaN(numDisks) || numDisks < 1 || numDisks > 6) {
    alert("Please enter a number between 1 and 6.");
    return;
  }
  rods = [[], [], []];
  document.getElementById("stepsContainer").innerHTML = "<h3>Steps:</h3>";
  for (let i = numDisks; i >= 1; i--) rods[0].push(i);
  moves = [];
  hanoi(numDisks, 0, 2, 1);
  animateMoves();
}

function hanoi(n, from, to, aux) {
  if (n === 0) return;
  hanoi(n - 1, from, aux, to);
  moves.push([from, to]);
  hanoi(n - 1, aux, to, from);
}

function drawRods() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const baseY = 250;
  const rodX = [150, 400, 650];

  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = "#555";
    ctx.fillRect(rodX[i] - 5, 100, 10, 150);
    for (let j = 0; j < rods[i].length; j++) {
      const disk = rods[i][j];
      ctx.fillStyle = "#4caf50";
      ctx.fillRect(
        rodX[i] - disk * 15,
        baseY - j * 20,
        disk * 30,
        15
      );
    }
  }
}

function animateMoves() {
  if (moves.length === 0) return;
  let i = 0;
  const interval = setInterval(() => {
    if (i >= moves.length) {
      clearInterval(interval);
      return;
    }
    const [from, to] = moves[i];
    const disk = rods[from].pop();
    rods[to].push(disk);
    drawRods();
    updateStepsDisplay(i, from, to, disk);
    i++;
  }, 800);
}

function updateStepsDisplay(stepIndex, from, to, disk) {
  const container = document.getElementById("stepsContainer");
  const step = document.createElement("p");
  step.textContent = `Step ${stepIndex + 1}: Move disk ${disk} from Rod ${from + 1} to Rod ${to + 1}`;
  step.style.margin = "5px 0";
  container.appendChild(step);
  container.scrollTop = container.scrollHeight;
}

drawRods();
