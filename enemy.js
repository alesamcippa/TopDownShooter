function Enemy(x, y, type) {
    this.x = x;
    this.y = y;

    if (type === "fast") {
        this.speed = 0.1;
        this.hp = 1;
        this.color = "red"; // Schneller Gegner (wenig HP)
    } else if (type === "tank") {
        this.speed = 0.03;
        this.hp = 3;
        this.color = "purple"; // Langsamer Gegner (mehr HP)
    } else {
        this.speed = 0.05;
        this.hp = 2;
        this.color = "green"; // Standard-Gegner
    }

    this.active = true;

    this.Tick = function (deltaTime) {
        if (!this.active) return;
        if (!currentPlayer) return;

        let dx = currentPlayer.xPos + currentPlayer.width / 2 - this.x;
        let dy = currentPlayer.yPos + currentPlayer.height / 2 - this.y;
        let magnitude = Math.sqrt(dx * dx + dy * dy);

        this.x += (dx / magnitude) * this.speed * deltaTime;
        this.y += (dy / magnitude) * this.speed * deltaTime;
    };

    this.Draw = function (context) {
        if (!this.active) return;

        context.fillStyle = this.color;
        context.fillRect(this.x - 10, this.y - 10, 20, 20);
    };

    this.OnHit = function () {
        this.hp--;
        if (this.hp <= 0) {
            this.active = false;
            score += 10; // Extra Punkte für Kills
        }
    };

    this.OnPlayerHit = function () {
        if (this.active) {
            this.active = false;
            playerHP--;
            console.log("Spieler getroffen! HP:", playerHP);

            if (playerHP <= 0) {
                alert("Game Over! Dein Score: " + score);
                location.reload();
            }
        }
    };
}