import {CollisionComponent} from "./CollisionComponent.js";
import Vector2 from "../math/Vector2.js";

export default class CollisionComponentRectangle extends CollisionComponent
{
    constructor(owner, rectangle) {
        super(owner);
        this.rectangle = rectangle;
    }

    static DoRectanglesOverlap(rectangle1, rectangle2) {

        let overlapX = Math.max(rectangle1.rectangle.x, rectangle2.rectangle.x);
        let overlapY = Math.max(rectangle1.rectangle.y, rectangle2.rectangle.y);

        let overlapWidth = Math.min(rectangle1.rectangle.x + rectangle1.rectangle.width, rectangle2.rectangle.x + rectangle2.rectangle.width) - overlapX;
        let overlapHeight = Math.min(rectangle1.rectangle.y + rectangle1.rectangle.height, rectangle2.rectangle.y + rectangle2.rectangle.height) - overlapY;

        if (overlapWidth > 0 && overlapHeight > 0)
        {
            return { "collide": true, "point": new Vector2(overlapX, overlapY)};
        }
        return { "collide": false, "point": new Vector2(0, 0)};
    }

    static DoCircleAndRectangleOverlap(rectangle1, circle2)
    {
        let nearX = Math.max(rectangle1.rectangle.x, Math.min(circle2.circle.x, rectangle1.rectangle.x + rectangle1.rectangle.width));
        let nearY = Math.max(rectangle1.rectangle.y, Math.min(circle2.circle.y, rectangle1.rectangle.y + rectangle1.rectangle.height));

        let deltaX = circle2.circle.x - nearX;
        let deltaY = circle2.circle.y - nearY;
        const diff = Math.sqrt(deltaX * deltaY + deltaY * deltaY);

        if (diff <= circle2.circle.radius)
        {
            return { "collide": true, "point": new Vector2(nearX, nearY)};
        }

        return { "collide": false, "point": new Vector2(0, 0)};
    }
}
