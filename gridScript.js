// vvvv Grid vvvv
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

    let squareSizeInPx = 576;
    setDivsStyle(gridResolution, squareSizeInPx);
  }
}
function clearGrid() {
  let mainGridDiv = document.querySelector("#main-grid-div");
  mainGridDiv.innerHTML = "";
}
// ^^^^ Grid ^^^^

// vvvv Grid Sizing vvvv
function setGridSizeButtonsListeners() {
  let buttons = document.querySelectorAll(".grid-size-button");
  
  buttons.forEach(button => {
    button.addEventListener("click", animateGridSizeChange);
  });
}

function animateGridSizeChange(e) {
  let gridContainer = document.querySelector("#main-grid-div");
  let sizeButtonPressed = e.currentTarget;

  // Animate out, add temporary class, remove animation class. 3 things
  gridContainer.classList.add("animation-move-grid-away");
  gridContainer.addEventListener("animationend", function handler1() {
    gridContainer.classList.add("keep-grid-away");
    gridContainer.classList.remove("animation-move-grid-away");
    gridContainer.removeEventListener("animationend", handler1);

    clearGrid();
    createGrid(Number(sizeButtonPressed.getAttribute("data-key"))); 

    // Remove temporary class, animate in, remove animation class
    gridContainer.classList.add("animation-move-grid-back");
    gridContainer.classList.remove("keep-grid-away"); // Maybe move this one before?
    gridContainer.addEventListener("animationend", function handler2() {
      gridContainer.classList.remove("animation-move-grid-back");
      gridContainer.removeEventListener("animationend", handler2);
    });    
  });
}
// ^^^^ Grid Sizing ^^^^

// vvvv Grid Styling vvvv
function setDivsStyle(amountDivs, canvasSize) {
  let allColDivs = document.querySelectorAll(".col-div");
  let size = canvasSize / amountDivs;
  allColDivs.forEach(coldiv => {
    coldiv.style.backgroundColor = "rgb(231, 206, 166)";
    coldiv.originalColor = "rgb(231, 206, 166)";
    coldiv.style.width = `${size}px`;
    coldiv.style.height = `${size}px`;
  });
}
// ^^^^ Grid Styling ^^^^

// vvvv Div Shadowing vvvv
function setListenersForShadowButtons() {
  let shadowButtons = document.querySelectorAll(".shadow-button");
  shadowButtons.forEach((button) => {
    button.addEventListener("mousedown", shadowHandler);
  });
}

function shadowHandler(event) {
  removeColoring();
  let shadowButtonPressed = event.currentTarget;
  let buttonBrightnessChange = shadowButtonPressed.getAttribute("data-brightnessChange");
  let divs = document.querySelectorAll(".col-div");
  divs.forEach((div) => {
    div.change = buttonBrightnessChange;
    div.addEventListener("mousedown", handlerDivsBrightness);
  });
}

function handlerDivsBrightness(e) {
  let divClicked = e.currentTarget;
  const resetBrightnessValue = "0";
  let divs = document.querySelectorAll(".col-div");
  
  if (divClicked.change === resetBrightnessValue) {
    resetLightnessOfDiv(e);
    divs.forEach((div) => {
      div.addEventListener("mouseenter", resetLightnessOfDiv);
    });
  } else {
    handlerForChangingBackground(e);
    divs.forEach((div) => {
      div.addEventListener("mouseenter", handlerForChangingBackground);
    });
  }
  
  window.addEventListener("mouseup", function mouseUpShadowHandler() {
    divs.forEach((div) => {
      div.removeEventListener("mouseenter", handlerForChangingBackground);
      div.removeEventListener("mouseenter", resetLightnessOfDiv);
    });
    window.removeEventListener("mouseup", mouseUpShadowHandler);
  });
}

function handlerForChangingBackground(e) {
  let div = e.currentTarget;
  let divChange = div.change;
  changeBackgroundLightnessOfElement(divChange, div, e);
}

function changeBackgroundLightnessOfElement(lightnessChange, element, e) {
  e.preventDefault();
  let elementColor = window.getComputedStyle(element).getPropertyValue("background-color");
  let elementRgbIntArray = elementColor.match(/[\d\.]+/g).map(Number);
  let elementHslColor = rgb2Hsl(elementRgbIntArray[0], elementRgbIntArray[1], elementRgbIntArray[2]);
  elementHslColor[2] = elementHslColor[2] + +lightnessChange;
  if (elementHslColor[2] < 100 && elementHslColor[2] > 0) {
    let formattedHslString = `hsl(${elementHslColor[0]}, ${elementHslColor[1]}%, ${elementHslColor[2]}%)`;
    element.style.backgroundColor = formattedHslString;
  }
}

function removeDarkening() {
  let allColDivs = document.querySelectorAll(".col-div");
  allColDivs.forEach(div => {
    div.removeEventListener("mousedown", handlerDivsBrightness);
  });
}

function resetLightnessOfDiv(event) {
  event.preventDefault();
  let divElement = event.currentTarget;
  divElement.style.backgroundColor = divElement.originalColor;
}

function getLightnessFromRgbString(rgbString) {
  let numbersFromRgbString = rgbString.match(/[\d\.]+/g);
  let integerRgbNumbers = numbersFromRgbString.map(Number);
  let hslIntegerArray = rgb2Hsl(integerRgbNumbers[0], integerRgbNumbers[1], integerRgbNumbers[2]);
  return hslIntegerArray[2];
}
// ^^^^ Div Shadowing ^^^^

// vvvv Color Painting vvvv
function setColorsListeners() {
  let colorButtons = document.querySelectorAll(".color-button");
  colorButtons.forEach((singleColorButton) => {
    singleColorButton.addEventListener("click", coloringButtonsHandler);
  });
  let eraser = document.querySelector("#eraser");
  eraser.addEventListener("click", coloringButtonsHandler);
}

function coloringButtonsHandler(event) {
  removeDarkening();
  let color = event.currentTarget.getAttribute("data-color");
  let divs = document.querySelectorAll(".col-div");
  divs.forEach((div) => {
    div.myColor = color;
    div.addEventListener("mousedown", setDivBackgroundColor);
  });
}

function removeColoring() {
  let allDivs = document.querySelectorAll(".col-div");
  allDivs.forEach((div) => {
    div.removeEventListener("mousedown", setDivBackgroundColor);
  })
}

function setDivBackgroundColor(event) {
  event.preventDefault();
  color = getColorFromDiv(event);
  let triggeringDiv = event.currentTarget;
  triggeringDiv.style.backgroundColor = color;
  triggeringDiv.originalColor = color;
  let allDivs = document.querySelectorAll(".col-div");
  allDivs.forEach((div) => {
    div.addEventListener("mouseenter", setBackgroundOfCurrentTarget);
  });

  window.addEventListener("mouseup", function mouseUpColorHandler() {
    allDivs.forEach((div) => {
      div.removeEventListener("mouseenter", setBackgroundOfCurrentTarget);
    });
    window.removeEventListener("mouseup", mouseUpColorHandler);
    console.log("Removed mouseup listener");
  });
}

function getColorFromDiv(event) {
  let currentDiv = event.currentTarget;
  let colorForDiv = currentDiv.myColor;
  if (colorForDiv === "rainbow") {
    return generateRandomHexColor()
  } else {
    return colorForDiv;
  }
}

function generateRandomHexColor() {
  const BRIGHTNESS = 40;
  let randomisedColor = randomColor(BRIGHTNESS);
  return randomisedColor
}

// vvvv David Mihal's Function vvvv
function randomColor(brightness) {
  function randomChannel(brightness) {
    var r = 255 - brightness;
    var n = 0 | ((Math.random() * r) + brightness);
    var s = n.toString(16);
    return (s.length == 1) ? '0' + s : s;
  }
  return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}
// ^^^^ David Mihal's Function ^^^^

function setBackgroundOfCurrentTarget(event) {
  let currentDiv = event.currentTarget;
  let colorForBackground = getColorFromDiv(event);
  currentDiv.style.backgroundColor = colorForBackground;
  currentDiv.originalColor = colorForBackground;
}


// ^^^^ Color Painting ^^^^

// vvvv Clear Button vvvv
function addClearButtonListener() {
  let clearButton = document.querySelector("#clear-button");
  clearButton.addEventListener("click", clearButtonHandler);
}

// This function will shake the grid and transition to being completely clear.
function clearButtonHandler() {
  addAnimationToElementUsingIdOrClass("#main-grid-div", "shake-grid");
  // Transition from the current color of the div to the default 'beige' color.
  // After finishing the transition it will actually clear the div and set it 
  // to the default 'beige' color.
  let allDivs = document.querySelectorAll(".col-div");
  allDivs.forEach((div) => {
    addAnimationToElement(div, "transition-background-color");
    div.addEventListener("animationend", function handler() {
      console.log("Finished transitioning");
      div.removeEventListener("animationend", handler);
      clearDivs();
    });
  });
}

function clearDivs() {
  let allGridDivs = document.querySelectorAll(".col-div");
  allGridDivs.forEach((div) => {
    div.style.backgroundColor = "rgb(231, 206, 166)";
    div.originalColor = "rgb(231, 206, 166)";
  });
}

function addAnimationToElementUsingIdOrClass(elementIdOrClass, animationName) {
  let element = document.querySelector(elementIdOrClass);
  element.classList.remove(animationName);
  void element.offsetWidth;
  element.classList.add(animationName);

  element.addEventListener("animationend", function handler() {
    element.classList.remove(animationName);
    element.removeEventListener("animationend", handler);
  });
}

function addAnimationToElement(element, animationName) {
  element.classList.remove(animationName);
  void element.offsetWidth;
  element.classList.add(animationName);

  element.addEventListener("animationend", function handler() {
    element.classList.remove(animationName);
    element.removeEventListener("animationend", handler);
  });
}
// ^^^^ Clear Button ^^^^

// vvvv Help Button vvvv
function setHelpButtonListeners() {
  let helpButton = document.querySelector("#help-button");
  let closeButton = document.querySelector("#close-button");
  helpButton.addEventListener("click", helpButtonHandler);
  closeButton.addEventListener("click", helpButtonHandler);
}

function helpButtonHandler(event) {
  let helpWindowContainer = document.querySelector("#help-popup-container");
  helpWindowContainer.classList.toggle("open-popup");
}
// ^^^^ Help Button ^^^^


createGrid(16);
setGridSizeButtonsListeners();
setColorsListeners();
setListenersForShadowButtons();
addClearButtonListener();
setHelpButtonListeners();