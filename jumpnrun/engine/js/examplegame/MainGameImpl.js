import {startLoop} from "../MainGame.js";
import {getContentMngr} from "../MainGame.js";
import MyPlayer from "./MyPlayer.js";
import KeyboardControl from "../controls/KeyboardControl.js";
import SoundPlayer, {SoundClass} from "../sound/SoundPlayer.js";
import Level from "./Level.js";
import Background from "./Background.js";
import HUD from "./HUD.js";
import GameOverScreen from "./GameOverScreen.js";
import {endGame} from "../MainGame.js";

let keyboardcontrol;
let loaded = 0;

export function startGame(level)
{
    startLoop();
    let contentmngr = getContentMngr();

    keyboardcontrol = new KeyboardControl();
    keyboardcontrol.activateKeyIntercept();

    window.hud = new HUD();
    let pl = new MyPlayer(keyboardcontrol, null, 350, 420, contentmngr, window.hud, showEndScreen);


    let idle = new Image();
    idle.onload = function() {
        pl.InitializeIdle(idle);
        loaded++;
    };
    idle.src = "./images/Idle-Sheet.png";

    let left = new Image();
    left.onload = function () {
        pl.InitializeLeft(left);
        loaded++;
    }
    left.src = "./images/RunLeft.png";

    let right = new Image();
    right.onload = function () {
        pl.InitializeRight(right);
        loaded++;
    }
    right.src = "./images/RunRight.png";

    window.contentmngr = contentmngr;

    let lvl = new Level(keyboardcontrol, contentmngr, 5, level);
    lvl.InitializeAnims();
    contentmngr.addDrawableObject(lvl);
    contentmngr.addTickableObject(lvl);
    window.level = lvl;

    contentmngr.addTickableObject(window.hud);
    contentmngr.addDrawableObject(window.hud);
    
    window.bg = new Background();
    let bg1 = new Image();
    bg1.onload = function () {
        bg.Initialize1(bg1);
        loaded++;
    }
    bg1.src = "./images/Background_1.png";

    let bg2 = new Image();
    bg2.onload = function () {
        bg.Initialize2(bg2);
        loaded++;
    }
    bg2.src = "./images/Background_2.png";
    contentmngr.addDrawableObject(bg);
    contentmngr.addTickableObject(pl);
    contentmngr.addDrawableObject(pl);



    //(url, tilewidth, tileheight)
    //CreateImagesArrayForTilemap("/engine/images/eventBlock.png", 16, 16);

    let sounds = [
        new SoundClass(0, "../../sounds/t-rex-roar.mp3")
    ];

    let soundpl = new SoundPlayer(sounds);
    window.soundPlayer = soundpl;
    setTimeout(function () {
        checkIfLoaded();
    }, 1);
}

function showEndScreen()
{
    window.bg.renderpriority = 999;
    let gameover = new GameOverScreen(window.hud.gametime);
    contentmngr.addDrawableObject(gameover);
    endGame();
   
}

function checkIfLoaded()
{
    if (loaded >= 5)
    {
        window.allLoaded = true;
    }
    else
    {
        setTimeout(function () {
            checkIfLoaded();
        }, 1);
    }
}