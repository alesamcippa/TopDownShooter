class Player extends CollidableRectangle {
    constructor(xPos, yPos, width, height) {
        super(xPos, yPos, width, height);
        this.speed = 0.2;
    }

    Tick(deltaTime) {
        // Bewegung wird durch den InputHandler geregelt
    }

    Draw(context) {
        super.Draw(context, 'blue');
    }
}
