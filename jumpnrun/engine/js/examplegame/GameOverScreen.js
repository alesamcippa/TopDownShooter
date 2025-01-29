import Actor from "../elements/Actor.js";

export default class GameOverScreen extends Actor
{
    constructor(finaltime) {
        super(0, 0, 1000);
        this.finaltime = finaltime;
    }

    Tick(deltaTime)
    {
    }

    Draw()
    {
        window.context2d.font = "24px Arial";
        window.context2d.fillStyle = "black";

        let millis = this.finaltime % 1000;
        let sec = this.finaltime / 1000;
        let min = sec / 60;
        sec = sec % 60;

        window.context2d.fillText("Your final time is: " + ("0" + parseInt(min)).slice(-2) + ":" +  ("0" + parseInt(sec)).slice(-2) + "." +  ("0" + parseInt(millis)).slice(-3), 50, 250);
    }

}