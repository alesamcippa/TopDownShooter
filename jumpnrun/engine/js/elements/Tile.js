import Actor from "./Actor.js";
import CollisionComponentRectangle from "../forms/CollisionComponentRectangle.js";
import Rectangle from "../forms/Rectangle.js";

export default class Tile extends Actor
{

    constructor(x, y, renderpriority, img, docollide, id)
    {
        super(x, y, renderpriority);
        this.image = img;
        this.startx = x;
        this.starty = y;
        this.id = id;

        if (docollide)
        {
            let rect = new Rectangle(x, y - 7, 30, 10);
            this.collisioncomponent = new CollisionComponentRectangle(this, rect)
        }
    }

    Reset(offsetx)
    {
        this.x = this.startx + offsetx;
        this.y = this.starty;
    }

    Tick(deltaTime)
    {
        if (this.collisioncomponent)
        {
            this.collisioncomponent.rectangle.x = this.x;
            this.collisioncomponent.rectangle.y = this.y - 7;
        }
    }


}