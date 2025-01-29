class Game {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.player = new Player(300, 400, 20, 20);
        this.enemies = [];
        this.projectiles = [];
        this.spawnRate = 2000;
        this.lastSpawn = 0;

        this.setupInput();
        this.startGameLoop();
    }

    setupInput() {
        this.inputHandler = new InputHandler(this.player, this);
    }

    startGameLoop() {
        let lastTime = 0;
        const gameLoop = (timestamp) => {
            let deltaTime = timestamp - lastTime;
            lastTime = timestamp;

            this.update(deltaTime);
            this.render();

            requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
    }

    update(deltaTime) {
        this.player.Tick(deltaTime);

        // Projektile und Gegner aktualisieren
        this.projectiles.forEach((projectile, pIndex) => {
            projectile.Tick(deltaTime);
            if (projectile.isOffScreen(this.canvas.width, this.canvas.height)) {
                this.projectiles.splice(pIndex, 1);
            }
        });

        this.lastSpawn += deltaTime;
        if (this.lastSpawn > this.spawnRate) {
            this.enemies.push(new Enemy(this.canvas));
            this.lastSpawn = 0;
        }

        this.enemies.forEach((enemy, eIndex) => {
            enemy.Tick(deltaTime, this.player);

            if (this.player.checkCollision(enemy)) {
                alert("Game Over!");
                this.reset();
            }

            this.projectiles.forEach((projectile, pIndex) => {
                if (projectile.checkCollision(enemy)) {
                    this.enemies.splice(eIndex, 1);
                    this.projectiles.splice(pIndex, 1);
                }
            });
        });
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.Draw(this.context);
        this.enemies.forEach((enemy) => enemy.Draw(this.context));
        this.projectiles.forEach((projectile) => projectile.Draw(this.context));
    }

    reset() {
        this.player = new Player(300, 400, 20, 20);
        this.enemies = [];
        this.projectiles = [];
        this.lastSpawn = 0;
    }
}

window.onload = () => {
    new Game();
};
