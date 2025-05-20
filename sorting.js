const container = document.getElementById("barContainer");
let array = [];

function generateBars() {
  array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1);
  container.innerHTML = "";
  array.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 2}px`;
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSort() {
  const algo = document.getElementById("algo").value;
  const bars = container.childNodes;
  switch (algo) {
    case "bubble": await bubbleSort(bars); break;
    case "selection": await selectionSort(bars); break;
    case "insertion": await insertionSort(bars); break;
  }
}

async function bubbleSort(bars) {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const h1 = parseInt(bars[j].style.height);
      const h2 = parseInt(bars[j + 1].style.height);
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";
      if (h1 > h2) {
        await sleep(50);
        [bars[j].style.height, bars[j + 1].style.height] = [bars[j + 1].style.height, bars[j].style.height];
      }
      bars[j].style.background = "#4caf50";
      bars[j + 1].style.background = "#4caf50";
    }
  }
}

async function selectionSort(bars) {
  let n = bars.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      const h1 = parseInt(bars[j].style.height);
      const h2 = parseInt(bars[minIdx].style.height);
      bars[j].style.background = "orange";
      if (h1 < h2) minIdx = j;
      await sleep(50);
      bars[j].style.background = "#4caf50";
    }
    if (minIdx !== i) {
      [bars[i].style.height, bars[minIdx].style.height] = [bars[minIdx].style.height, bars[i].style.height];
    }
  }
}

async function insertionSort(bars) {
  let n = bars.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && parseInt(bars[j - 1].style.height) > parseInt(bars[j].style.height)) {
      bars[j - 1].style.background = "blue";
      bars[j].style.background = "blue";
      await sleep(50);
      [bars[j - 1].style.height, bars[j].style.height] = [bars[j].style.height, bars[j - 1].style.height];
      bars[j - 1].style.background = "#4caf50";
      bars[j].style.background = "#4caf50";
      j--;
    }
  }
}