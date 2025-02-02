function Enemy(x, y, type) {
    this.x = x;
    this.y = y;

    this.loadImages = function(basePath, count) {
        let images = [];
        for (let i = 1; i <= count; i++) {
            let img = new Image();
            img.src = `${basePath}${i}.png`;
            images.push(img);
        }
        return images;
    };

    if (type === "fast") {
        this.speed = 0.1;
        this.hp = 1;
        this.color = null; // Kein Farb-Override für schnelle Gegner
        this.idleImages = this.loadImages('assets/ESchnell/Idle/idle down', 4);
        this.moveImages = this.loadImages('assets/ESchnell/Move/walk down', 4);
        this.attackImages = this.loadImages('assets/ESchnell/Sching/attack down', 4);
        this.width = 32;
        this.height = 32;

    } else if (type === "tank") {
        this.speed = 0.03;
        this.hp = 3;
        this.color = "purple"; // Langsamer Gegner (mehr HP)
        this.width = 20;
        this.height = 20;
    } else {
        this.speed = 0.05;
        this.hp = 2;
        this.color = "green"; // Standard-Gegner
        this.width = 20;
        this.height = 20;
    }

    this.active = true;
    this.state = 'idle'; // Mögliche Zustände: 'idle', 'move', 'attack'
    this.frameIndex = 0;
    this.frameCount = 0;

    this.getCurrentImages = function() {
        switch (this.state) {
            case 'move':
                return this.moveImages;
            case 'attack':
                return this.attackImages;
            default:
                return this.idleImages;
        }
    };

    this.updateAnimation = function() {
        const currentImages = this.getCurrentImages();
        if (!currentImages || currentImages.length === 0) return;

        this.frameCount++;
        if (this.frameCount >= 5) { // Bildwechsel alle 5 Frames
            this.frameIndex = (this.frameIndex + 1) % currentImages.length;
            this.frameCount = 0;
        }
    };

    this.Tick = function(deltaTime) {
        if (!this.active) return;
        if (!currentPlayer) return;

        let dx = currentPlayer.xPos + currentPlayer.width / 2 - this.x;
        let dy = currentPlayer.yPos + currentPlayer.height / 2 - this.y;
        let magnitude = Math.sqrt(dx * dx + dy * dy);

        this.x += (dx / magnitude) * this.speed * deltaTime;
        this.y += (dy / magnitude) * this.speed * deltaTime;

        this.state = 'move';
        this.updateAnimation();
    };

    this.Draw = function(context) {
        if (!this.active) return;

        if (this.color) {
            context.fillStyle = this.color;
            context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        } else {
            const currentImages = this.getCurrentImages();
            if (!currentImages || currentImages.length === 0) return;

            const currentImage = currentImages[this.frameIndex];
            context.drawImage(currentImage, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    };

    this.OnHit = function() {
        this.hp--;
        if (this.hp <= 0) {
            this.active = false;
            score += 10; // Extra Punkte für Kills
        }
    };

    this.OnPlayerHit = function() {
        if (this.active) {
            this.state = 'attack';
            this.frameIndex = 0; // Startet Attack-Animation von vorne
            playerHP--;
            console.log("Spieler getroffen! HP:", playerHP);

            if (playerHP <= 0) {
                alert("Game Over! Dein Score: " + score);
                location.reload();
            }
        }
    };
}
