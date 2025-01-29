import Vector2 from './Vector2.js';

export function add(a, b)
{
   return new Vector2(a.x + b.x, a.y + b.y);
}
export function subtract(a, b)
{
    return new Vector2(a.x - b.x, a.y - b.y);
}
export function multiply(a, b)
{
    return new Vector2(a.x * b.x, a.y * b.y);
}
export function divide(a, b)
{
    return new Vector2(a.x / b.x, a.y / b.y);
}
export function interpolate(start, finish, time, elapsed)
{
    let timefactor = Math.min(elapsed / (time * 1.0), 1.0);
    const x = start.x + (end.x - start.x) * timefactor;
    const y = start.y + (end.y - start.y) * timefactor;

    return new Vector2(x, y);
}

export function applyGravity(currentForce, gravityVector, deltaTime)
{
    let result = new Vector2(0,0);

    result.x = currentForce.x + (gravityVector.x * deltaTime);
    result.y = currentForce.y + (gravityVector.y * deltaTime);

     if (result.y > gravityVector.y)
         result.y = gravityVector.y;

     return result;
}