import {CollisionComponent} from "./CollisionComponent.js";
import Vector2 from "../math/Vector2.js";

export default class CollisionComponentCircle extends CollisionComponent
{
    constructor(owner, circle) {
        super(owner);
        this.circle = circle;
    }

    static DoCirclesOverlap(circle1, circle2) {
        
        let dx = circle2.circle.x - circle1.circle.x;
        let dy = circle2.circle.y - circle1.circle.y;
        let diff = Math.sqrt(dx * dx + dy * dy);

        if (diff <= (circle1.circle.radius + circle2.circle.radius))
        {
            let nx = dx / diff;
            let ny = dy / diff;

            let x = circle1.circle.x + nx * circle1.circle.radius;
            let y = circle1.circle.y + ny * circle1.circle.radius;

            return { "collide": true, "point": new Vector2(x, y)};
        }

        return { "collide": false, "point": new Vector2(0, 0)};
    }
}
