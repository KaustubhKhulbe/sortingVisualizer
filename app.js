var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

let values = [];
let arrMaxSize = canvas.height / 3;
let xGap = 12,
  width = 10,
  y = 0;
let size = 50;
let height = canvas.height / 2;
let time = 10;
sorted = false;

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setUp() {
  values = [];
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < size; i++) {
    values.push(Math.floor(Math.random() * arrMaxSize + 1));
  }
  drawArray(-2);
}

async function drawArray(j) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < values.length; i++) {
    if (i == j) {
      context.fillStyle = "#FF0000";
      //context.fillRect(i * xGap, y, width, Math.abs(height - values[i]));
      context.fillRect(i * xGap, y, width, Math.abs(values[i]));
      context.fillStyle = "#00008B";
      continue;
    } else if (j == -1) {
      context.fillStyle = "#00ff00";
      context.fillRect(i * xGap, y, width, Math.abs(values[i]));
      context.fillStyle = "#00008B";
      continue;
    }
    context.fillRect(i * xGap, y, width, Math.abs(values[i]));
  }
}

async function bubbleSort() {
  var swapp;
  var n = values.length - 1;
  var x = values;
  do {
    swapp = false;
    for (var i = 0; i < n; i++) {
      if (x[i] < x[i + 1]) {
        var temp = x[i];
        x[i] = x[i + 1];
        x[i + 1] = temp;
        swapp = true;
      }

      values = x;
      await sleep(time);
      console.log("Stepped");
      drawArray(i);
    }
    n--;
  } while (swapp);
  drawArray(-1);
  sorted = true;
  printArray();
}

async function selectionSort() {
  let len = values.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (values[min] > values[j]) {
        min = j;
      }
      await sleep(time);
      drawArray(j);
    }
    if (min !== i) {
      let tmp = values[i];
      values[i] = values[min];
      values[min] = tmp;
      await sleep(time);
      drawArray(i);
    }
  }
  drawArray(-2);
  sorted = true;
}

async function printArray() {
  for (var i = 0; i < values.length; i++) {
    console.log("Element: " + values[i]);
  }
}

async function main() {
  context.fillStyle = "#00008B";
  setUp();
  drawArray(-2);
}

main();
