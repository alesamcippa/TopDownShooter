class CollidableRectangle extends Collidable {
    constructor(xPos, yPos, width, height) {
        super(xPos, yPos, width, height);
    }

    Draw(context, color) {
        context.beginPath();
        context.rect(this.xPos, this.yPos, this.width, this.height);
        context.strokeStyle = color;
        context.stroke();
    }

    Tick(deltaTime) {
        // Basislogik f�r Bewegung, kann von Subklassen �berschrieben werden
    }
}
