class InputHandler {
    constructor(player, game) {
        this.player = player;
        this.game = game;

        this.movement = { up: false, down: false, left: false, right: false };
        this.shootDirection = { x: 1, y: 0 };  // Initiale Richtung nach rechts

        // Tastendr¸cke verarbeiten
        window.addEventListener('keydown', (event) => this.keyDown(event));
        window.addEventListener('keyup', (event) => this.keyUp(event));
    }

    keyDown(event) {
        switch (event.key) {
            case 'w':
                this.movement.up = true;
                break;
            case 's':
                this.movement.down = true;
                break;
            case 'a':
                this.movement.left = true;
                break;
            case 'd':
                this.movement.right = true;
                break;

            // Schussrichtung ‰ndern
            case 'ArrowUp':
                this.shootDirection = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                this.shootDirection = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                this.shootDirection = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                this.shootDirection = { x: 1, y: 0 };
                break;

            // Schieﬂen
            case 'q':
                this.shoot();
                break;
        }

        this.handleMovement();
    }

    keyUp(event) {
        switch (event.key) {
            case 'w':
                this.movement.up = false;
                break;
            case 's':
                this.movement.down = false;
                break;
            case 'a':
                this.movement.left = false;
                break;
            case 'd':
                this.movement.right = false;
                break;
        }

        this.handleMovement();
    }

    handleMovement() {
        const speed = this.player.speed * 10;  // Bewegungsgeschwindigkeit

        if (this.movement.up) {
            this.player.yPos -= speed;
        }
        if (this.movement.down) {
            this.player.yPos += speed;
        }
        if (this.movement.left) {
            this.player.xPos -= speed;
        }
        if (this.movement.right) {
            this.player.xPos += speed;
        }
    }

    shoot() {
        const projectileWidth = 5;
        const projectileHeight = 5;

        // Initiale Position des Projektils abh‰ngig von der Schussrichtung
        const projectileX = this.player.xPos + this.player.width / 2 - projectileWidth / 2;
        const projectileY = this.player.yPos + this.player.height / 2 - projectileHeight / 2;

        // Neues Projektil erstellen
        const projectile = new Projectile(projectileX, projectileY, projectileWidth, projectileHeight, this.shootDirection);
        this.game.projectiles.push(projectile);
    }
}
