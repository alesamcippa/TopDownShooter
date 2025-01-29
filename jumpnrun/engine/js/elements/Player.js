import BaseForm from '../forms/BaseForm.js';
import KeyboardControl from "../controls/KeyboardControl.js";
import MouseControl from "../controls/MouseControl.js";
import Actor from "./Actor.js";

export default class Player extends Actor
{
    constructor(keyboardControl, mouseControl,x ,y, renderpriority) {
        super(x, y, renderpriority);
        this.keyboardControl = keyboardControl;
        this.mouseControl = mouseControl;
    }



}