function createGrid(gridResolution) {
    for (let row = 0; row < gridResolution; row++) {
        let consoleMessage = `Row:${row}\t`;

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row-div");
        // Add the CSS class
        
        for (let col = 0; col < gridResolution; col++) {
            consoleMessage += `col ${col} `;

            const colDiv = document.createElement("div");
            colDiv.classList.add("col-div");
            rowDiv.appendChild(colDiv);
            // Add the CSS class
        }

        let mainGridDiv = document.querySelector(".main-grid-div");
        mainGridDiv.appendChild(rowDiv);
        
        console.log(consoleMessage);
        createClassForDivs(gridResolution, 512);
    }
}

createGrid(5);


function createClassForDivs(amountDivs, canvasSize) {
    let allColDivs = document.querySelectorAll(".col-div");
    let size = canvasSize / amountDivs;
    console.log(size);
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
            console.log(div);
            div.style.backgroundColor = "black";
        });
    });
}
