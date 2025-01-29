class Player extends Collidable {
    constructor(yPos, xPos, width, height, objectName, blockPlayer, renderpriority) {
        super(yPos, xPos, width, height * 1.5, objectName, blockPlayer, renderpriority);
        this.lookDirection = { x: 0, y: -1 }; // Anfangs nach oben
        this.aimDirection = { x: 0, y: -1 }; // Anfangs gleiche Richtung
        this.bullets = [];
        this.state = 'idle'; // Mögliche Zustände: 'idle', 'move', 'reload', 'shoot'
        this.frameIndex = 0;
        this.frameCount = 0;

        this.idleImages = this.loadImages('assets/Player/Idle/survivor-idle_handgun_', 20);
        this.moveImages = this.loadImages('assets/Player/Move/survivor-move_handgun_', 20);
        this.reloadImages = this.loadImages('assets/Player/Reload/survivor-reload_handgun_', 15);
        this.shootImages = this.loadImages('assets/Player/Shoot/survivor-shoot_handgun_', 3);
    }

    loadImages(basePath, count) {
        let images = [];
        for (let i = 0; i < count; i++) {
            let img = new Image();
            img.src = `${basePath}${i}.png`;
            images.push(img);
        }
        return images;
    }

    updateAnimation() {
        this.frameCount++;
        if (this.frameCount >= 5) { // Wechsle das Bild alle 5 Frames
            this.frameIndex = (this.frameIndex + 1) % this.getCurrentImages().length;
            this.frameCount = 0;

            // **Wechsel nach Schießen automatisch auf Reload, dann auf Idle**
            if (this.state === 'shoot' && this.frameIndex === this.shootImages.length - 1) {
                this.state = 'reload';
                this.frameIndex = 0;
                setTimeout(() => {
                    this.state = 'idle';
                }, 300); // **0.3 Sekunden Reload-Zeit**
            }
        }
    }

    getCurrentImages() {
        switch (this.state) {
            case 'move':
                return this.moveImages;
            case 'reload':
                return this.reloadImages;
            case 'shoot':
                return this.shootImages;
            default:
                return this.idleImages;
        }
    }

    UpdateAimDirection(mouseX, mouseY) {
        // Berechne Mausposition relativ zum Spieler
        let dx = mouseX - (this.xPos + this.width / 2);
        let dy = mouseY - (this.yPos + this.height / 2);
        let magnitude = Math.sqrt(dx * dx + dy * dy);

        dx /= magnitude; // Normalisieren
        dy /= magnitude;

        // Berechne Winkel zwischen Maus und Blickrichtung
        const lookAngle = Math.atan2(this.lookDirection.y, this.lookDirection.x); // Blickrichtung in Radiant
        const mouseAngle = Math.atan2(dy, dx); // Mauswinkel in Radiant
        const angleDiff = mouseAngle - lookAngle;

        // Begrenze den Winkel auf ±45° (90° Sichtkegel)
        if (angleDiff >= -Math.PI / 4 && angleDiff <= Math.PI / 4) {
            this.aimDirection = { x: dx, y: dy };
        }
    }

    Tick(deltaTime) {
        let moved = false;
        if (keysPressed[87]) { // W-Taste
            this.yPos -= deltaTime * 0.1;
            this.lookDirection = { x: 0, y: -1 }; // Nach oben
            moved = true;
        }
        if (keysPressed[83]) { // S-Taste
            this.yPos += deltaTime * 0.1;
            this.lookDirection = { x: 0, y: 1 }; // Nach unten
            moved = true;
        }
        if (keysPressed[65]) { // A-Taste
            this.xPos -= deltaTime * 0.1;
            this.lookDirection = { x: -1, y: 0 }; // Nach links
            moved = true;
        }
        if (keysPressed[68]) { // D-Taste
            this.xPos += deltaTime * 0.1;
            this.lookDirection = { x: 1, y: 0 }; // Nach rechts
            moved = true;
        }

        if (this.state !== 'shoot' && this.state !== 'reload') {
            this.state = moved ? 'move' : 'idle';
        }
        this.updateAnimation();

        this.bullets.forEach(bullet => bullet.Tick(deltaTime));
    }

    Draw() {
        const currentImage = this.getCurrentImages()[this.frameIndex];
        context.drawImage(currentImage, this.xPos, this.yPos, this.width, this.height);

        // Sichtkegel zeichnen
        const lookAngle = Math.atan2(this.lookDirection.y, this.lookDirection.x);
        context.beginPath();
        context.arc(
            this.xPos + this.width / 2,
            this.yPos + this.height / 2,
            60, // Radius
            lookAngle - Math.PI / 4, // Startwinkel
            lookAngle + Math.PI / 4 // Endwinkel
        );
        context.fillStyle = "rgba(0, 0, 255, 0.1)"; // Transparente Farbe für den Sichtkegel
        context.fill();

        // Ziel-Linie zeichnen
        const aimEndX = this.xPos + this.width / 2 + this.aimDirection.x * 50;
        const aimEndY = this.yPos + this.height / 2 + this.aimDirection.y * 50;
        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(this.xPos + this.width / 2, this.yPos + this.height / 2);
        context.lineTo(aimEndX, aimEndY);
        context.stroke();

        this.bullets.forEach(bullet => bullet.Draw());
    }

    SpawnBullet() {
        if (this.state === 'reload') return; // **Kann während Reload nicht schießen**
        const bullet = new Bullet(
            this.xPos + this.width / 2,
            this.yPos + this.height / 2,
            this.aimDirection // Zielrichtung
        );
        this.bullets.push(bullet);

        this.state = 'shoot';
        this.frameIndex = 0; // Animation von vorne beginnen

        // ? Schuss-Sound abspielen
        let shootSound = new Audio("assets/shoot.mp3");
        shootSound.volume = 0.5;
        shootSound.play();
    }

    Reload() {
        this.state = 'reload';
        this.frameIndex = 0; // Animation von vorne beginnen
    }
}

class Bullet {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction; // Richtung als Vektor
        this.speed = 5;
    }

    Tick(deltaTime) {
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
    }

    Draw() {
        context.fillStyle = 'black';
        context.fillRect(this.x - 2, this.y - 2, 4, 4);
    }
}