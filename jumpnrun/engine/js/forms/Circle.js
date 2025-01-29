import BaseForm from './BaseForm.js';

export default class Circle extends BaseForm
{
    constructor(x, y, radius)
    {
        super(x, y);
        this.radius = radius;
    }
}