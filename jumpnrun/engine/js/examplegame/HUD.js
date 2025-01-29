import Actor from "../elements/Actor.js";

export default class HUD extends Actor
{
    constructor() {
        super(0, 0, 98);
        this.gametime = 0.0;
        this.coins = 0;
    }

    Tick(deltaTime)
    {
        this.gametime += deltaTime * 1000;
    }

    Draw()
    {
        window.context2d.font = "16px Arial";
        window.context2d.fillStyle = "black";

        let millis = this.gametime % 1000;
        let sec = this.gametime / 1000;
        let min = sec / 60;
        sec = sec % 60;

        window.context2d.fillText("Time: " + ("0" + parseInt(min)).slice(-2) + ":" +  ("0" + parseInt(sec)).slice(-2) + "." +  ("0" + parseInt(millis)).slice(-3), 10, 20);
        window.context2d.fillText("Coins: " + ("00" + parseInt(this.coins)).slice(-3), 10, 40);
    }

}