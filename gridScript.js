function createGrid(gridResolution) {
  for (let row = 0; row < gridResolution; row++) {
    //let consoleMessage = `Row:${row}\t`;

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row-div");
    // Add the CSS class

    for (let col = 0; col < gridResolution; col++) {
      //consoleMessage += `col ${col} `;

      const colDiv = document.createElement("div");
      colDiv.classList.add("col-div");
      rowDiv.appendChild(colDiv);
      // Add the CSS class
    }

    let mainGridDiv = document.querySelector(".main-grid-div");
    mainGridDiv.appendChild(rowDiv);

    //console.log(consoleMessage);
    createClassForDivs(gridResolution, 768);
  }
}

createGrid(16);
createEventListenersForGridSizeButtons();
createEventListenersForDivsDarkening();


function createClassForDivs(amountDivs, canvasSize) {
  let allColDivs = document.querySelectorAll(".col-div");
  let size = canvasSize / amountDivs;
  //console.log(size);
  allColDivs.forEach(coldiv => {
    //console.log(coldiv);
    coldiv.style.backgroundColor = "#E7CEA6";
    coldiv.style.width = `${size}px`;
    coldiv.style.height = `${size}px`;
  });
}

function createEventListenersForDivsDarkening() {
  let allColDivs = document.querySelectorAll(".col-div");
  allColDivs.forEach(div => {
    div.addEventListener("mouseenter", handler);

    
  });
}
function handler(e) {
      let elem = e.target
      makeDarkerByPercentage(0.1, elem);
    }
function removeDarkening() {
  let allColDivs = document.querySelectorAll(".col-div");
  allColDivs.forEach(div => {
    div.removeEventListener("mouseenter", handler);
  })
}

function createEventListenersForGridSizeButtons() {
  let buttons = document.querySelectorAll(".grid-size-button");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      clearGrid();
      createGrid(Number(button.getAttribute("data-key")));
      console.log(button.getAttribute("data-key"));
      createEventListenersForDivsDarkening();
    });
  });
}

function clearGrid() {
  let mainGridDiv = document.querySelector(".main-grid-div");
  mainGridDiv.innerHTML = "";
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

function createEventListenerForColourButtons() {
  let elements = document.querySelectorAll(".color-button");
  elements.forEach((element) => {
    element.addEventListener("click", myHandler);
  });
}


function myHandler(e) {
  console.log(e.target);

}

function removeListener() {
  let elements = document.querySelectorAll(".color-button");
  elements.forEach((element) => {
    element.removeEventListener("click", myHandler);
  })
}

createEventListenerForColourButtons();
