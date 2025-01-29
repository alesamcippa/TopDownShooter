import {CreateImagesArrayForTilemap} from "../images/ImageHelper.js";
import Tile from "../elements/Tile.js";
import {KEYS} from "../controls/KeyboardControl.js";

export default class Level
{


    constructor(keyboardcontrol, contentmngr, renderpriority, lvl)
    {
        //CreateImagesArrayForTilemap("/engine/images/eventBlock.png", 16, 16);
        // CreateImagesArrayForTilemap(img, tilewidth, tileheight, fromx, tox, fromy, toy)
        // {

        this.renderpriority = renderpriority;
        this.keyboardcontrol = keyboardcontrol;
        this.contentmngr = contentmngr;
        this.blockleft = false;
        this.blockright = false;
        this.onground = false;

        this.arr = lvl;

    }

    async InitializeAnims()
    {
        let img;

        const imageLoadPromise = new Promise(resolve => {
            img = new Image();
            img.onload = resolve;
            img.src = "./images/Assets.png";
        });
        await imageLoadPromise;

        this.x = 0;
        this.y = 0;
        this.tiles = [];

        //(img, tilewidth, tileheight, fromx, tox, fromy, toy)
        this.images = CreateImagesArrayForTilemap(img, 16, 16, 0, 400, 0, 400);

        for (let a = 0; a < this.arr.length; a++)
        {
            let col = [];
            for (let b = 0; b < this.arr[a].length; b++)
            {
                if (this.arr[a][b] > 0)
                {
                    let tile = new Tile((b * 30), (a * 30), 10, this.images[this.arr[a][b] - 1], true, this.arr[a][b]);
                    col.push(tile);
                    contentmngr.addTickableObject(tile);
                    contentmngr.addCollidableEventsObject(tile.collisioncomponent);
                }
            }
            this.tiles.push(col);
        }
        this.currentXOffset = 0;

        this.initialized = true;
    }

    Reset(offset)
    {
        this.x = 0;
        this.y = 0;


        for (let a = 0; a < this.arr.length; a++) {
            for (let b = 0; b < this.arr[a].length; b++) {
                if (this.tiles[a][b]) {
                    this.tiles[a][b].Reset(this.tmp);
                }
            }
        }
    }

    Tick(deltaTime)
    {
        if (this.keyboardcontrol.isKeyDown(KEYS.KEY_D) && !this.blockright)
        {
            this.x -= deltaTime * 300.0;
        }
        else if (this.keyboardcontrol.isKeyDown(KEYS.KEY_A) && !this.blockleft)
        {
            this.x += deltaTime * 300.0;
        }
    }

    Draw()
    {
        let calculated = false;

        if (!this.initialized)
            return;

        for (let a = 0; a < this.arr.length; a++)
        {
            for (let b = 0; b < this.arr[a].length; b++)
            {
                if (this.tiles[a][b] && !this.tiles[a][b].hide)
                {
                    if (this.onground && !calculated)
                    {
                        this.tmp = this.tiles[a][b].x - this.tiles[a][b].startx;
                        calculated = true;
                    }

                    this.onground = false;
                    this.tiles[a][b].x  = this.tiles[a][b].x + this.x;
                    this.tiles[a][b].y  = this.tiles[a][b].y + this.y;
                    window.context2d.drawImage(this.tiles[a][b].image, this.tiles[a][b].x, this.tiles[a][b].y, 610, 305);
                }
            }
            
        }

        this.x = 0;
        this.y = 0;
    }
}