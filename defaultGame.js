let difficulty = 1;  // Startwert für Schwierigkeit
let enemySpawnRate = 2000; // Anfangs spawnt ein Gegner alle 2 Sekunden
let lastDifficultyIncrease = 0;
let healItems = [];
let lastHealSpawnTime = 0;
let highscore = localStorage.getItem("highscore") || 0;
let gameOver = false;
let score = 0;
let playerHP = 3;
let canvas, context, lastExecutedTime;
let currentPlayer = null;
let enemies = [];
let lastEnemySpawnTime = 0;

window.onload = function () {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    lastExecutedTime = Date.now();

    // **Spieler erstellen**
    currentPlayer = new Player(20, 20, 20, 20, "player", false, 99);

    // Hauptspiel starten
    setInterval(doTick, 16); // 60 FPS
};

function spawnEnemy() {
    const x = Math.random() < 0.5 ? 0 : canvas.width;
    const y = Math.random() * canvas.height;

    let type = "normal"; // Standard-Gegner

    // Je nach Schwierigkeit stärkere Gegner häufiger machen
    if (difficulty >= 3 && Math.random() < 0.3) type = "fast";
    if (difficulty >= 5 && Math.random() < 0.3) type = "tank";

    enemies.push(new Enemy(x, y, type));
}

function Tick(deltaTime) {
    // Gegner spawnen alle 2 Sekunden
    if (Date.now() - lastEnemySpawnTime > 2000) {
        spawnEnemy();
        lastEnemySpawnTime = Date.now();
    }

    // Alle 10 Sekunden ein Heil-Item spawnen
    if (Date.now() - lastHealSpawnTime > 10000) {
        spawnHealItem();
        lastHealSpawnTime = Date.now();
    }

    // Schwierigkeit steigt alle 10 Sekunden
    if (Date.now() - lastDifficultyIncrease > 10000) {
        difficulty += 1;
        enemySpawnRate = Math.max(500, enemySpawnRate - 200); // Spawn-Rate verkürzen, min. 500ms
        console.log("Schwierigkeit erhöht! Stufe:", difficulty, "Spawn-Rate:", enemySpawnRate);
        lastDifficultyIncrease = Date.now();
    }

    // Feind-Spawning aktualisieren
    if (Date.now() - lastEnemySpawnTime > enemySpawnRate) {
        spawnEnemy();
        lastEnemySpawnTime = Date.now();
    }

    if (currentPlayer) {
        currentPlayer.Tick(deltaTime);
    }

    // Kollisionsprüfung: Kugeln vs Gegner
    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];

        // **1?? Kugel trifft Gegner**
        for (let j = currentPlayer.bullets.length - 1; j >= 0; j--) {
            let bullet = currentPlayer.bullets[j];

            if (checkCollision(enemy, bullet)) {
                enemy.OnHit();
                currentPlayer.bullets.splice(j, 1);
                playSound("assets/hit.mp3"); // ? Treffer-Sound

                // Highscore aktualisieren
                if (score > highscore) {
                    highscore = score;
                    localStorage.setItem("highscore", highscore);
                }
            }
        }

        // **2?? Gegner trifft Spieler**
        let dx = currentPlayer.xPos - enemy.x;
        let dy = currentPlayer.yPos - enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 15) { // Falls Spieler und Gegner sich berühren
            playerHP--;
            console.log("Spieler getroffen! HP:", playerHP);
            enemy.active = false; // Gegner verschwindet nach Berührung

            if (playerHP <= 0) {
                playSound("assets/gameover.mp3"); // ? Game Over Sound
                gameOver = true;
            }
        }
    }

    for (let i = healItems.length - 1; i >= 0; i--) {
        let item = healItems[i];
        let dx = currentPlayer.xPos - item.x;
        let dy = currentPlayer.yPos - item.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 15) { // Falls der Spieler das Item berührt
            playerHP = Math.min(playerHP + 1, 3); // Max. 3 HP
            healItems.splice(i, 1); // Item entfernen
            console.log("Heil-Item aufgesammelt! HP:", playerHP);
        }
    }

    // Nur aktive Gegner behalten
    enemies = enemies.filter(enemy => enemy.active);
    enemies.forEach(enemy => enemy.Tick(deltaTime));
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (currentPlayer) {
        currentPlayer.Draw();
    }
    enemies.forEach(enemy => enemy.Draw(context));

    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 30);
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Leben: " + playerHP, 10, 50);
    context.fillText("Highscore: " + highscore, 10, 70);

    if (gameOver) {
        // Halbtransparenter schwarzer Hintergrund
        context.fillStyle = "rgba(0, 0, 0, 0.8)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Text
        context.fillStyle = "white";
        context.font = "30px Arial";
        context.textAlign = "center";
        context.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 50);
        context.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 - 10);
        context.fillText("Highscore: " + highscore, canvas.width / 2, canvas.height / 2 + 30);

        // **Neustart-Button**
        let buttonX = canvas.width / 2 - 75;
        let buttonY = canvas.height / 2 + 70;
        let buttonWidth = 150;
        let buttonHeight = 50;

        context.fillStyle = "gray";
        context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        context.fillStyle = "white";
        context.font = "25px Arial";
        context.fillText("Restart", canvas.width / 2, buttonY + 32);
    }

    healItems.forEach(item => {
        context.fillStyle = "darkred";
        context.fillRect(item.x - 10, item.y - 10, 20, 20);
    });
}

function doTick() {
    const now = Date.now();
    const deltaTime = now - lastExecutedTime;

    Tick(deltaTime);
    Draw();

    lastExecutedTime = now;
}

function checkCollision(enemy, bullet) {
    let distance = Math.sqrt(
        (enemy.x - bullet.x) * (enemy.x - bullet.x) +
        (enemy.y - bullet.y) * (enemy.y - bullet.y)
    );

    return distance < 10; // Wenn der Abstand klein genug ist, ist es ein Treffer
}

function spawnHealItem() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    healItems.push({ x: x, y: y });
}

function playSound(src) {
    let sound = new Audio(src);
    sound.volume = 0.5; // Lautstärke auf 50% setzen
    sound.play();
}