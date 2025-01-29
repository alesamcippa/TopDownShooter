import Actor from "../elements/Actor.js";

export default class Background extends Actor
{
    constructor() {
        super(0, 0, -1);
    }

    Initialize1(loadedimg1)
    {
        this.img1 = loadedimg1;
    }
    Initialize2(loadedimg2)
    {
        this.img2 = loadedimg2;
        this.loaded = true;
    }

    Draw()
    {
        if (!this.loaded)
            return;

        window.context2d.drawImage(this.img2, this.x, this.y, 800, 600);
        window.context2d.drawImage(this.img1, this.x, this.y, 800, 600);

    }

}   