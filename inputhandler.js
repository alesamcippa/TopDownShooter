let keysPressed = {};

document.onkeydown = function (e) {
    keysPressed[e.keyCode] = true;
};

document.onkeyup = function (e) {
    keysPressed[e.keyCode] = false;
};

document.addEventListener("mousemove", function (event) {
    if (currentPlayer) {
        const rect = canvas.getBoundingClientRect(); // Canvas-Koordinaten
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        currentPlayer.UpdateAimDirection(mouseX, mouseY);
    }
});

document.addEventListener("mousedown", function (event) {
    if (event.button === 0 && currentPlayer) { // Linksklick
        currentPlayer.SpawnBullet();
    }
});

document.addEventListener("mousedown", function (event) {
    if (gameOver) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;

        let buttonX = canvas.width / 2 - 75;
        let buttonY = canvas.height / 2 + 70;
        let buttonWidth = 150;
        let buttonHeight = 50;

        console.log("Mouse Clicked at:", mouseX, mouseY);
        console.log("Button Area:", buttonX, buttonY, buttonX + buttonWidth, buttonY + buttonHeight);

        if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
            mouseY > buttonY && mouseY < buttonY + buttonHeight) {
            console.log("Restart Button Clicked!");
            location.reload(); // Spiel neu starten
        }
    }
});