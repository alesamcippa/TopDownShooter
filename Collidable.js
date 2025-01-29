class Collidable {
    constructor(yPos, xPos, width, height, objectName, blockPlayer, renderpriority) {
        this.yPos = yPos;
        this.xPos = xPos;
        this.width = width;
        this.height = height;
        this.objectName = objectName;
        this.blockPlayer = blockPlayer;
        this.renderpriority = renderpriority;
        this.collidingActors = [];
    }

    OnCollide(other) {
        if (!this.collidingActors.includes(other)) {
            this.collidingActors.push(other);
        }
    }

    OnUnCollide(other) {
        const index = this.collidingActors.indexOf(other);
        if (index >= 0) {
            this.collidingActors.splice(index, 1);
        }
    }
}
