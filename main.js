const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");
const inputBaseEl = document.getElementById("inputBase");
const outputBaseEl = document.getElementById("outputBase");
const panelEl = document.getElementById("panel");
const alertEl = document.getElementById("alert");
const backspaceBtn = document.getElementById("backspace");

const DISPLAY_ORDER = [13, 14, 15, 10, 11, 12, 7, 8, 9, 4, 5, 6, 1, 2, 3];
const BUTTONS = [...Array(16).keys()].map((i) => i.toString(16).toUpperCase());

let input = "";
let inputBase = 10;
let outputBase = 16;
const digitButtons = [];

function fillBases(select, selected) {
  for (let i = 2; i <= 16; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === selected) option.selected = true;
    select.appendChild(option);
  }
}

fillBases(inputBaseEl, inputBase);
fillBases(outputBaseEl, outputBase);

inputEl.classList.add("input");
inputBaseEl.classList.add("chip");
outputBaseEl.classList.add("chip");
outputEl.classList.add("output");
backspaceBtn.classList.add("button");

function addChar(char) {
  if (input.length >= 15) {
    showAlert();
    return;
  }

  if (input === "0" && char === "0") return;
  if (input === "0") input = char;
  else input += char;

  outputEl.value = "";
  render();
}

function backspace() {
  input = input.slice(0, -1);
  outputEl.value = "";
  render();
}

function clear() {
  input = "";
  outputEl.value = "";
  render();
}

function calculate() {
  outputEl.value = convertNumber(input, inputBase, outputBase);
}

function render() {
  inputEl.value = input || "";
}

function showAlert() {
  alertEl.style.opacity = "0.9";
  alertEl.style.display = "block";
  setTimeout(() => (alertEl.style.opacity = "0"), 3000);
}

function updateDisabledButtons() {
  digitButtons.forEach((btn) => {
    const index = Number(btn.dataset.index);
    btn.disabled = index >= inputBase;
  });
}

DISPLAY_ORDER.forEach((index) => {
  const btn = document.createElement("button");
  btn.textContent = BUTTONS[index];
  btn.dataset.index = index;
  btn.onclick = () => addChar(BUTTONS[index]);
  btn.classList.add("button");
  panelEl.appendChild(btn);
  digitButtons.push(btn);
});

const clearBtn = document.createElement("button");
clearBtn.textContent = "C";
clearBtn.style.color = "#e11717";
clearBtn.classList.add("button");
clearBtn.onclick = clear;

const zeroBtn = document.createElement("button");
zeroBtn.textContent = "0";
zeroBtn.classList.add("button");
zeroBtn.onclick = () => addChar("0");

const eqBtn = document.createElement("button");
eqBtn.textContent = "=";
eqBtn.style.background = "#3b7aff";
eqBtn.style.color = "white";
eqBtn.classList.add("button");
eqBtn.onclick = calculate;

panelEl.append(clearBtn, zeroBtn, eqBtn);

backspaceBtn.onclick = backspace;

inputBaseEl.onchange = (e) => {
  inputBase = +e.target.value;
  clear();
  updateDisabledButtons();
};

outputBaseEl.onchange = (e) => {
  outputBase = +e.target.value;
  outputEl.value = "";
};

render();
updateDisabledButtons();
