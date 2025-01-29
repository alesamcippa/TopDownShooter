import BaseForm from '../forms/BaseForm.js';
import {toRadian} from "../math/RotationMath.js";

export default class Actor
{
    constructor(x, y, renderpriority)
    {
        this.rotation = 0.0;
        this.x = x;
        this.y = y;
        this.renderpriority = renderpriority;
    }

    Tick(deltaTime)
    {

    }

    Draw()
    {

    }

    DoCollide(other, point, owncollisioncomp)
    {

    }

    RotateCanvas()
    {
        window.context2d.save();
        window.context2d.translate( this.x + 10, this.y + 10 );
        window.context2d.rotate(toRadian(this.rotation));
        window.context2d.translate( -(this.x + 10), -(this.y + 10) );
    }

    UnRotateCanvas()
    {
        window.context2d.restore();
    }
    
    Destroy(contentmanager)
    {
        contentmanager.removeDrawableObject(this);
        contentmanager.removeTickableObject(this);
    }
}