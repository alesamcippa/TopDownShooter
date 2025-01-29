class Collidable {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    checkCollision(other) {
        return (
            this.xPos < other.xPos + other.width &&
            this.xPos + this.width > other.xPos &&
            this.yPos < other.yPos + other.height &&
            this.yPos + this.height > other.yPos
        );
    }
}
