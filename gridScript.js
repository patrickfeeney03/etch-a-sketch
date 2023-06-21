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
        createClassForDivs(gridResolution, 960);
    }
}

createGrid(16);
//createEventListenerSetGridSizeButton();
createEventListenersForDivs();


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

function createEventListenersForDivs() {
    let allColDivs = document.querySelectorAll(".col-div");
    allColDivs.forEach(div => {
        div.addEventListener("mouseenter", function() {
            //console.log(div);
            //div.style.backgroundColor = "black";
            makeDarkerByPercentage(0.1, this);
            //console.log(this);
        });
    });
}

function createEventListenerSetGridSizeButton() {
    let buttonElement = document.querySelector(".grid-amount-prompt");
    buttonElement.addEventListener("click", function() {
        let userPrompt = prompt("Enter the desired size. For example 32, 64, 50");
        clearGrid();
        createGrid(Number(userPrompt));
        createEventListenersForDivs();
    })
}

function createEventListenersForGridSizeButtons() {
    let buttons = document.querySelectorAll(".grid-size-button");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            clearGrid();
            createGrid(Number(button.getAttribute("data-key")));
            console.log(button.getAttribute("data-key"));
        });
    });
}

function clearGrid() {
    let mainGridDiv = document.querySelector(".main-grid-div");
    mainGridDiv.innerHTML = "";
}

function makeDarkerByPercentage(change, element) {
    //let element = document.querySelector(elementIdOrClass);
    let elementFilters = window.getComputedStyle(element).getPropertyValue("filter");
    let elementFiltersArray = elementFilters.split(" ");
    let intValueBrightness = 1;
    
    if (elementFilters != "none") {
        for (let i = 0; i < elementFiltersArray.length; i++) {
            if (elementFiltersArray[i].includes("brightness")) {
                // Element has already been modified.
                console.log("found");
                intValueBrightness = elementFiltersArray[i].split("(")[1].split(")")[0];
                elementFiltersArray.splice(i, 1);
            }
        }
        let appendingMessage = ` brightness(${intValueBrightness - change})`;
        let convertArrayToString = elementFiltersArray.join(" ");
        let finalString = convertArrayToString + appendingMessage;
        element.style.filter = finalString;
    
    } else {
        element.style.filter = `brightness(${intValueBrightness - change})`
    }

    //console.log(finalString);
    //console.log(convertArrayToString)
    //console.log(elementFiltersArray);
    console.log(`number ${intValueBrightness}`);

    //let brightnessExample = 10;
    //elementFilters += ` brightness(${brightnessExample}%)`
    //element.style.filter = elementFilters;
    //console.log(element.style.filter);
    //let filterArray = elementFilters.split(" ");
    //console.log(filterArray);
    
    //element.style.filter = `brightness(${Number(elementBrightness) - percentageOfChange}%)`;
    //elementBrightness += percentageOfChange;
    //console.log(elementFilters);
}

//makeDarkerByPercentage(0.1, ".main-grid-div");
