import Vector2 from '../math/Vector2.js';

export default class MouseControl
{
    constructor(canvas)
    {
        this.canvas = canvas;
    }

    initialize()
    {
        document.onmousemove = function(e)
        {
            document.mousepositionevent = e;
        };
        document.onmousedown = function(e)
        {
            document.mouseButtonDown = true;
        };
        document.onmouseup = function(e)
        {
            document.mouseButtonDown = false;
        };
        document.onclick = function(e)
        {
            document.wasclicked = true;
        };
    }

    getMousePosition()
    {
        if (!document.mousepositionevent)
            return null;
        
        let rect = this.canvas.getBoundingClientRect();
        let x = document.mousepositionevent.clientX - rect.left;
        let y = document.mousepositionevent.clientY - rect.top;

        return new Vector2(x, y);
    }

    isMouseButtonDown()
    {
        return document.mouseButtonDown;
    }
    isMouseClicked()
    {
        let tmp = document.wasclicked;
        document.wasclicked = false;
        return tmp;
    }
}