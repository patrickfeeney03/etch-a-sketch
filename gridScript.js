// Grid vvvvvv
function createGrid(gridResolution) {
  for (let row = 0; row < gridResolution; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row-div");
    for (let col = 0; col < gridResolution; col++) {
      const colDiv = document.createElement("div");
      colDiv.classList.add("col-div");
      rowDiv.appendChild(colDiv);
    }
    let mainGridDiv = document.querySelector(".main-grid-div");
    mainGridDiv.appendChild(rowDiv);

    setDivsStyle(gridResolution, 768);
  }
}
function clearGrid() {
  let mainGridDiv = document.querySelector(".main-grid-div");
  mainGridDiv.innerHTML = "";
}
// Grid ^^^^^^^

// Grid Sizing vvvv
function setGridSizeButtonsListeners() {
  let buttons = document.querySelectorAll(".grid-size-button");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      clearGrid();
      createGrid(Number(button.getAttribute("data-key")));
      createEventListenersForDivsDarkening();
    });
  });
}
// Grid Sizing ^^^^

function setDivsStyle(amountDivs, canvasSize) {
  let allColDivs = document.querySelectorAll(".col-div");
  let size = canvasSize / amountDivs;
  allColDivs.forEach(coldiv => {
    coldiv.style.backgroundColor = "#E7CEA6";
    coldiv.style.width = `${size}px`;
    coldiv.style.height = `${size}px`;
  });
}

/* Darkerning vvvvvvvvvvvvv */
function createEventListenersForDivsDarkening() {
  let allColDivs = document.querySelectorAll(".col-div");
  allColDivs.forEach(div => {
    div.addEventListener("mouseenter", handler);
  });
}
function removeDarkening() {
  let allColDivs = document.querySelectorAll(".col-div");
  allColDivs.forEach(div => {
    div.removeEventListener("mouseenter", handler);
  })
}
function handler(e) {
  let elem = e.target
  makeDarkerByPercentage(0.1, elem);
}
function makeDarkerByPercentage(change, element) {
  let elementFilters = window.getComputedStyle(element).getPropertyValue("filter");
  let elementFiltersArray = elementFilters.split(" ");
  let intValueBrightness = 1;
  if (elementFilters != "none") {
    for (let i = 0; i < elementFiltersArray.length; i++) {
      if (elementFiltersArray[i].includes("brightness")) {
        // Element has already been modified.
        intValueBrightness = elementFiltersArray[i].split("(")[1].split(")")[0];
        elementFiltersArray.splice(i, 1);
      }
    }
    let appendingMessage = ` brightness(${intValueBrightness - change})`;
    let convertArrayToString = elementFiltersArray.join(" ");
    let finalString = convertArrayToString + appendingMessage;
    element.style.filter = finalString;
  } else {
    element.style.filter = `brightness(${intValueBrightness - change})`;
  }
}
/* Darkening ^^^^^^^^^^^^^^^^^^^^^ */









// vvvv Color Painting vvvv
function setColorsListeners() {
  
  let colorButtons = document.querySelectorAll(".color-button");
  colorButtons.forEach((singleColorButton) => {
    singleColorButton.addEventListener("click", myHandler);
  });
}

function removeColorsListeners() {
  let elements = document.querySelectorAll(".color-button");
  elements.forEach((element) => {
    element.removeEventListener("click", myHandler);
  });
}

function myHandler(e) {
  removeDarkening();
  let color = e.target.getAttribute("data-color");
  console.log(color);
  // vvvv Adding new listeners to grid divs vvvv
  let divs = document.querySelectorAll(".col-div");
  divs.forEach((div) => {
    div.myColor = color; // Add the pressed color to the divs to be used in listeners funct
    div.addEventListener("mouseenter", paintDiv);
  });
}

function paintDiv(event) {
  let singleDivElement = event.currentTarget;
  let color = singleDivElement.myColor;
  singleDivElement.style.backgroundColor = color;
  
  
}

function removeListener() {
  let elements = document.querySelectorAll(".color-button");
  elements.forEach((element) => {
    element.removeEventListener("click", myHandler);
  })
}

// ^^^^ Color Painting ^^^^

createGrid(16);
setGridSizeButtonsListeners();
createEventListenersForDivsDarkening();
setColorsListeners();
