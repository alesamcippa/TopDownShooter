class Enemy extends CollidableRectangle {
    constructor(canvas) {
        const width = 20;
        const height = 20;
        const speed = Math.random() * 0.1 + 0.05;

        const { xPos, yPos } = Enemy.randomSpawnPosition(canvas, width, height);
        super(xPos, yPos, width, height);
        this.speed = speed;
    }

    static randomSpawnPosition(canvas, width, height) {
        const side = Math.floor(Math.random() * 4);
        let xPos, yPos;

        if (side === 0) { // oben
            xPos = Math.random() * canvas.width;
            yPos = -height;
        } else if (side === 1) { // rechts
            xPos = canvas.width;
            yPos = Math.random() * canvas.height;
        } else if (side === 2) { // unten
            xPos = Math.random() * canvas.width;
            yPos = canvas.height;
        } else { // links
            xPos = -width;
            yPos = Math.random() * canvas.height;
        }

        return { xPos, yPos };
    }

    Tick(deltaTime, player) {
        const directionX = player.xPos - this.xPos;
        const directionY = player.yPos - this.yPos;
        const length = Math.sqrt(directionX * directionX + directionY * directionY);
        this.xPos += (directionX / length) * this.speed * deltaTime;
        this.yPos += (directionY / length) * this.speed * deltaTime;
    }

    Draw(context) {
        super.Draw(context, 'red');
    }
}
