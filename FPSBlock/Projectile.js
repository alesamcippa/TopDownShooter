class Projectile extends CollidableRectangle {
    constructor(xPos, yPos, width, height, vector) {
        super(xPos, yPos, width, height);
        this.vector = vector;
        this.speed = 0.3;
    }

    Tick(deltaTime) {
        this.xPos += this.vector.x * this.speed * deltaTime;
        this.yPos += this.vector.y * this.speed * deltaTime;
    }

    Draw(context) {
        super.Draw(context, 'green');  // Projektil ist grün
    }

    isOffScreen(canvasWidth, canvasHeight) {
        return (
            this.xPos < 0 || this.xPos > canvasWidth ||
            this.yPos < 0 || this.yPos > canvasHeight
        );
    }
}
