import Vector2 from './Vector2.js';

export function toRadian(degree)
{
    return degree * Math.PI / 180;
}

export function getForwardVector(vector, radian)
{
    let forwardX = vector.x * Math.cos(radian) - vector.y * Math.sin(radian);
    let forwardY = vector.x * Math.sin(radian) + vector.y * Math.cos(radian);

    return new Vector2(forwardX, forwardY);
}