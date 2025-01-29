import ContentManager from './ContentManager.js';
import CollisionComponentCircle from "./forms/CollisionComponentCircle.js";
import CollisionComponentRectangle from "./forms/CollisionComponentRectangle.js";

let isRunning;
let contentmngr;
let lastExecutedTime;

function initialize()
{
    isRunning = true;
    contentmngr = new ContentManager();
    window.allLoaded = false;

    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d');
    window.context2d = context;
    window.canvas = canvas;

    window.context2d.font = "10px Arial";
    window.context2d.fillStyle = "black";
    window.context2d.fillText("Loading.... Please wait", 20, 250);

}

export function getContentMngr()
{
    return contentmngr;
}

export function endGame()
{
    isRunning = false;
}

export function startLoop()
{
    initialize();
    lastExecutedTime = Date.now();

    setTimeout(function () {
        loop();
    }, 1);
}

function loop()
{
    let passed = (Date.now() - lastExecutedTime) / 1000.0;
    lastExecutedTime = Date.now();
    if (!window.allLoaded)
    {
        if (isRunning)
        {
            setTimeout(function () {
                loop();
            }, 1);
        }
        lastExecutedTime = Date.now();
        return;
    }

    Tick(passed);
    Draw();

    window.context2d.font = "10px Arial";
    window.context2d.fillStyle = "red";
    window.context2d.fillText("FPS: " + parseInt(1.0 / passed), 750, 10);


    if (isRunning)
    {
        setTimeout(function () {
            loop();
        }, 0);
    }
}

function Tick(deltaTime)
{
    let currentTickList = contentmngr.TickableObjects;

    for (let i = 0; i < currentTickList.length; i++)
    {
        if (currentTickList[i])
            currentTickList[i].Tick(deltaTime);
    }

    let collisionChecks = contentmngr.CollidableEventsObjects;
    for (let x = 0; x < collisionChecks.length; x++)
    {
        for (let y = 0; y < collisionChecks.length; y++)
        {
            if (collisionChecks[x] != collisionChecks[y])
            {
                if (collisionChecks[x] instanceof CollisionComponentCircle && collisionChecks[y] instanceof CollisionComponentCircle)
                {
                    let col = CollisionComponentCircle.DoCirclesOverlap(collisionChecks[x], collisionChecks[y]);

                    if (col.collide)
                    {
                        collisionChecks[x].DoCollide(collisionChecks[y], col.point, collisionChecks[x]);
                    }
                }
                else if (collisionChecks[x] instanceof CollisionComponentRectangle && collisionChecks[y] instanceof CollisionComponentRectangle)
                {
                    let col = CollisionComponentRectangle.DoRectanglesOverlap(collisionChecks[x], collisionChecks[y]);

                    if (col.collide)
                    {
                        collisionChecks[x].DoCollide(collisionChecks[y], col.point, collisionChecks[x]);
                    }
                }
                else if (collisionChecks[x] instanceof CollisionComponentCircle && collisionChecks[y] instanceof CollisionComponentRectangle)
                {
                    let col = CollisionComponentRectangle.DoCircleAndRectangleOverlap(collisionChecks[y], collisionChecks[x]);

                    if (col.collide)
                    {
                        collisionChecks[x].DoCollide(collisionChecks[y], col.point, collisionChecks[x]);
                    }
                }
                else if (collisionChecks[x] instanceof CollisionComponentRectangle && collisionChecks[y] instanceof CollisionComponentCircle)
                {
                    let col = CollisionComponentRectangle.DoCircleAndRectangleOverlap(collisionChecks[x], collisionChecks[y]);

                    if (col.collide)
                    {
                        collisionChecks[x].DoCollide(collisionChecks[y], col.point, collisionChecks[x]);
                    }
                }
            }
        }
    }
}

function Draw()
{
    let currentDrawList = contentmngr.DrawableObjects;

    window.context2d.clearRect(0, 0, window.canvas.width, window.canvas.height);
    for (let i = 0; i < currentDrawList.length; i++)
    {
        if (currentDrawList[i])
            currentDrawList[i].Draw();
    }
}

