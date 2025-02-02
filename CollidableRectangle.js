class CollidableRectangle extends Collidable {
    Tick(deltaTime) {

    }

    Draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
