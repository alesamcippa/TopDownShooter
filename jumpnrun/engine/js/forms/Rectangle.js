import BaseForm from './BaseForm.js';

export default class Rectangle extends BaseForm
{
    constructor(x, y, width, height)
    {
        super(x, y);
        this.width = width;
        this.height = height;
    }
}