const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.x = 0;
    this.y = 0;
  }
}

let root = null;

function insertNode() {
  const value = parseInt(document.getElementById("value").value);
  if (!isNaN(value)) {
    root = insert(root, value);
    animateDraw();
  }
}

function height(node) {
  return node ? node.height : 0;
}

function getBalance(node) {
  return node ? height(node.left) - height(node.right) : 0;
}

function rightRotate(y) {
  let x = y.left;
  let T2 = x.right;
  x.right = y;
  y.left = T2;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  return x;
}

function leftRotate(x) {
  let y = x.right;
  let T2 = y.left;
  y.left = x;
  x.right = T2;
  x.height = Math.max(height(x.left), height(x.right)) + 1;
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  return y;
}

function insert(node, value) {
  if (!node) return new Node(value);

  if (value < node.value) node.left = insert(node.left, value);
  else if (value > node.value) node.right = insert(node.right, value);
  else return node;

  node.height = 1 + Math.max(height(node.left), height(node.right));

  let balance = getBalance(node);

  if (balance > 1 && value < node.left.value) return rightRotate(node);
  if (balance < -1 && value > node.right.value) return leftRotate(node);
  if (balance > 1 && value > node.left.value) {
    node.left = leftRotate(node.left);
    return rightRotate(node);
  }
  if (balance < -1 && value < node.right.value) {
    node.right = rightRotate(node.right);
    return leftRotate(node);
  }

  return node;
}

function animateDraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (root) setPositions(root, canvas.width / 2, 50, canvas.width / 4);
  let nodes = [];
  collectNodes(root, nodes);
  let i = 0;
  function drawNextNode() {
    if (i >= nodes.length) return;
    drawTree(root);
    drawNode(nodes[i], true);
    i++;
    setTimeout(drawNextNode, 300);
  }
  drawNextNode();
}

function setPositions(node, x, y, offset) {
  if (!node) return;
  node.x = x;
  node.y = y;
  setPositions(node.left, x - offset, y + 70, offset / 2);
  setPositions(node.right, x + offset, y + 70, offset / 2);
}

function collectNodes(node, nodes) {
  if (!node) return;
  nodes.push(node);
  collectNodes(node.left, nodes);
  collectNodes(node.right, nodes);
}

function drawTree(node) {
  if (!node) return;
  if (node.left) drawLine(node, node.left);
  if (node.right) drawLine(node, node.right);
  drawTree(node.left);
  drawTree(node.right);
  drawNode(node);
}

function drawNode(node, highlight = false) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
  ctx.fillStyle = highlight ? "#ff9800" : "#4caf50";
  ctx.fill();
  ctx.strokeStyle = "#333";
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(node.value, node.x, node.y);
}

function drawLine(from, to) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 2;
  ctx.stroke();
}

animateDraw();