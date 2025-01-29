
import AnimatedImage from "./AnimatedImage.js";

export function CreateImagesArrayForTilemap(img, tilewidth, tileheight, fromx, tox, fromy, toy)
{
   let resultlist = [];

    var canvas = document.createElement("canvas");
    canvas.style.visibility = "hidden";
    canvas.style.width = tilewidth;
    canvas.style.height = tileheight;
    var ctx = canvas.getContext("2d");

    let x = fromx;
    let y = fromy;

    for (y = fromy; y < toy; y += tileheight)
    {
        for (x = fromx; x < tox; x += tilewidth)
        {
            ctx.clearRect(0,0, tilewidth, tileheight);
            ctx.drawImage(img, x, y, tilewidth, tileheight, 0, 0, tilewidth, tileheight );

            var tmp = new Image();
            tmp.src = canvas.toDataURL();
            resultlist.push(tmp);
        }
    }

    return resultlist;
}

export function CreateAnimatedImageForTileset(img, tilewidth, tileheight, fps, fromx, tox, fromy, toy)
{
    let images = CreateImagesArrayForTilemap(img, tilewidth, tileheight, fromx, tox, fromy, toy);
    return new AnimatedImage(images, fps);
}