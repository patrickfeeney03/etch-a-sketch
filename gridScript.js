function createGrid(gridResolution) {
    for (let row = 0; row < gridResolution; row++) {
        let consoleMessage = `Row:${row}\t`;
        for (let col = 0; col < gridResolution; col++) {
            consoleMessage += `col ${col} `;
        }
        console.log(consoleMessage);
    }
}

createGrid(16);