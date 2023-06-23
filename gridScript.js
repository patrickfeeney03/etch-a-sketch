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
    let mainGridDiv = document.querySelector("#main-grid-div");
    mainGridDiv.appendChild(rowDiv);

    setDivsStyle(gridResolution, 576);
  }
}
function clearGrid() {
  let mainGridDiv = document.querySelector("#main-grid-div");
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

// vvvv Grid Styling vvvv
function setDivsStyle(amountDivs, canvasSize) {
  let allColDivs = document.querySelectorAll(".col-div");
  let size = canvasSize / amountDivs;
  allColDivs.forEach(coldiv => {
    coldiv.style.backgroundColor = "#E7CEA6";
    coldiv.style.width = `${size}px`;
    coldiv.style.height = `${size}px`;
  });
}
// ^^^^ Grid Styling ^^^^

// vvvv Div Shadowing vvvv

/* 
- The makeDarkerByPercentage function works fine, don't touch it.
- Add event listeners for the 3 buttons.
- Set event listeners for grid divs when any of the 3 buttons are pressed.
- Only modify grid when clicking, and keeping the click down. Not when hovering.
  * Do the as with the color painting
- Make sure to remove all unnecessary listeners once the user clicks on another shadowing
  button or a color/eraser button
*/

function setListenersForShadowButtons() {
  let shadowButtons = document.querySelectorAll(".shadow-button");
  shadowButtons.forEach((button) => {
    button.addEventListener("mousedown", shadowHandler);
  });
}

function shadowHandler(event) {
  let triggeringButton = event.target
  let buttonChange = triggeringButton.getAttribute("data-brightnessChange");
  // Run function to remove painting and all other listeners that are attached to the col-div's
  let divs = document.querySelectorAll(".col-div");
  divs.forEach((div) => {
    div.change = buttonChange;
    div.addEventListener("mousedown", handler);
    // Make sure that this listener gets deleted when another button is pressed?
  });
}

function handler(e) {
  let elem = e.currentTarget;
  let resetBrightnessValue = "0";
  let divs = document.querySelectorAll(".col-div");
  let myBody = document.querySelector("body");
  if (elem.change === resetBrightnessValue) {
    resetBrightness(e);
    divs.forEach((div) => {
      div.addEventListener("mouseenter", resetBrightness);
    });
    myBody.addEventListener("mouseup", () => {
      divs.forEach((div) => {
        div.removeEventListener("mouseenter", resetBrightness);
      });
    });
  } else {
    makeDarkerByPercentage(e);
    divs.forEach((div) => {
      div.addEventListener("mouseenter", makeDarkerByPercentage);
    });
    myBody.addEventListener("mouseup", () => {
      divs.forEach((div) => {
        div.removeEventListener("mouseenter", makeDarkerByPercentage);
      });
    });
  }



}


function removeDarkening() {
  let allColDivs = document.querySelectorAll(".col-div");
  allColDivs.forEach(div => {
    div.removeEventListener("mousedown", handler);
  })
}

function makeDarkerByPercentage(event) {
  event.preventDefault();
  let divElement = event.currentTarget;
  let intChange = +divElement.change;

  let elementFilters = window.getComputedStyle(divElement).getPropertyValue("filter");
  let elementFiltersArray = elementFilters.split(" ");
  let intValueBrightness = 1;
  if (elementFilters != "none") {
    console.log("Ran if");
    for (let i = 0; i < elementFiltersArray.length; i++) {
      if (elementFiltersArray[i].includes("brightness")) {
        intValueBrightness = +elementFiltersArray[i].split("(")[1].split(")")[0];
        elementFiltersArray.splice(i, 1);
      }
    }
    let appendingMessage = ` brightness(${intValueBrightness + intChange})`;
    let convertArrayToString = elementFiltersArray.join(" ");
    let finalString = convertArrayToString + appendingMessage;
    divElement.style.filter = finalString;
    console.log(`New brightness: ${finalString}`);
  } else {
    divElement.style.filter = `brightness(${intValueBrightness + intChange})`;
    console.log(`New brightness: ${intValueBrightness + intChange}`);
  }
}

function resetBrightness(event) {
  let divElement = event.currentTarget;
  let currentElementFilters = window.getComputedStyle(divElement).getPropertyValue("filter");
  let currentElementFiltersArray = currentElementFilters.split(" ");
  if (currentElementFilters != "none") {
    for (let i = 0; i < currentElementFiltersArray.length; i++) {
      if (currentElementFiltersArray[i].includes("brightness")) {
        currentElementFiltersArray.splice(i, 1);
      }
    }
    let appendingMessage = ` brightness(${1})`;
    let convertArrayToString = currentElementFiltersArray.join(" ");
    let finalString = convertArrayToString + appendingMessage;
    divElement.style.filter = finalString;
    console.log(finalString);
  }
}


// ^^^^ Div Shadowing ^^^^

// vvvv Color Painting vvvv
function setColorsListeners() {
  let colorButtons = document.querySelectorAll(".color-button");
  colorButtons.forEach((singleColorButton) => {
    singleColorButton.addEventListener("click", myHandler);
  });
  let eraser = document.querySelector("#eraser");
  eraser.addEventListener("click", myHandler);
}

// This function is unnecessary
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
  let divs = document.querySelectorAll(".col-div");
  // Configure the function that will get called when a div is clicked
  divs.forEach((div) => {
    div.myColor = color;
    // vvvv Painting triggering from mouse input vvvv
    div.addEventListener("mousedown", setDivBackgroundColor);
    // ^^^^ Painting triggering from mouse input ^^^^
  });
  let mainBody = document.querySelector("body");
  mainBody.addEventListener("mouseup", checkIfListenersAreOff);
}

function checkIfListenersAreOff(e) {
  if (e.buttons != 1) {
    removeMouseMovementListeners();
  }
}

function setDivBackgroundColor(event) {
  event.preventDefault();
  console.log(`Adding mouseenter listeners`);
  let triggeringDiv = event.currentTarget;
  triggeringDiv.style.backgroundColor = triggeringDiv.myColor;
  let allDivs = document.querySelectorAll(".col-div");
  allDivs.forEach((div) => {
    div.addEventListener("mouseenter", onlySetBackground);
  });
}

function onlySetBackground(event) {
  //console.log("a");
  if (true) {
    let singleDivElement = event.currentTarget;
    let colorForBackground = singleDivElement.myColor;
    singleDivElement.style.backgroundColor = colorForBackground;
  }
}

function removeMouseMovementListeners() {
  console.log(`Removing mouseenter listeners`);
  let allDivs = document.querySelectorAll(".col-div");
  allDivs.forEach((div) => {
    div.removeEventListener("mouseenter", onlySetBackground);
  });
}


// ^^^^ Color Painting ^^^^



// vvvv Eraser vvvv
/*
function setEraserListener() {
  removeDarkening();
  let eraserElement = document.querySelector("#eraser");
  let color = eraserElement.getAttribute("data-color");

  let divs = document.querySelectorAll(".col-div");
  divs.forEach((div) => {
    div.myColor = color;
    div.addEventListener("mousedown", setDivBackgroundColor);
  });
  
}
setEraserListener();
*/
// ^^^^ Eraser ^^^^

createGrid(16);
setGridSizeButtonsListeners();
//createEventListenersForDivsDarkening();
//setColorsListeners();
