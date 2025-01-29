class CollidableRectangle extends Collidable {
    Tick(deltaTime) {
        // Hier könnten wir z. B. Bewegung hinzufügen
    }

    Draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
