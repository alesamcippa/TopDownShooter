class CollidableRectangle extends Collidable {
    Tick(deltaTime) {
        // Hier k�nnten wir z. B. Bewegung hinzuf�gen
    }

    Draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
