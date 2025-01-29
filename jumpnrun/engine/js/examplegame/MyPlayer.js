import Player from "../elements/Player.js";
import {KEYS} from "../controls/KeyboardControl.js";
import Vector2 from "../math/Vector2.js";
import {applyGravity} from "../math/VectorMath.js";
import Rectangle from "../forms/Rectangle.js";

import CollisionComponentRectangle from "../forms/CollisionComponentRectangle.js";
import {CreateAnimatedImageForTileset} from "../images/ImageHelper.js";

export const MOVING =
    {
        IDLE: 0,
        RIGHT: 1,
        LEFT: 2,
        JUMP: 3
    };

export default class MyPlayer extends Player
{


    constructor(keyboardControl, mouseControl, x, y, contentmngr, hud, finishevent) {
        super(keyboardControl, mouseControl, x, y, 99);

        this.Gravity = new Vector2(0, 20);
        this.Force = new Vector2(0, 0);
        this.onground = false;
        let rct = new Rectangle(27,0, 20, 4);
        this.collisioncomponent = new CollisionComponentRectangle(this, rct);
        this.lastDeathTime = 5.0;

        let rctrespawn = new Rectangle(27,0, 1, 1);
        this.collisioncomponentRespawn = new CollisionComponentRectangle(this, rctrespawn);

        let rctleft = new Rectangle(0, 2, 3, 25);
        this.collisioncomponentLeft = new CollisionComponentRectangle(this, rctleft);
        
        let rctright = new Rectangle(0, 28, 3, 25);
        this.collisioncomponentRight = new CollisionComponentRectangle(this, rctright);

        this.othercollideBottom = null;
        this.dir = MOVING.IDLE;
        this.hud = hud;

        this.startx = x;
        this.starty = y;
        this.finishevent = finishevent;

        contentmngr.addCollidableEventsObject(this.collisioncomponentRespawn);
        contentmngr.addCollidableEventsObject(this.collisioncomponent);
        contentmngr.addCollidableEventsObject(this.collisioncomponentLeft);
        contentmngr.addCollidableEventsObject(this.collisioncomponentRight);
    }

    InitializeIdle(idleimg)
    {
        this.idleimg = CreateAnimatedImageForTileset(idleimg, 32, 32, 30, 0, 128, 0, 32);
    }
    InitializeLeft(leftimg)
    {
        this.leftanim = CreateAnimatedImageForTileset(leftimg, 32, 32, 30, 0, 128, 0, 32);
    }
    InitializeRight(rightimg)
    {
        this.walkright = CreateAnimatedImageForTileset(rightimg, 32, 32, 30, 0, 128, 0, 32);
        this.initialized = true;
    }

    Tick(deltaTime)
    {
        if (!this.initialized)
            return;

       this.lastDeathTime += deltaTime;

       let newForce = applyGravity(this.Force, this.Gravity, deltaTime);

       this.idleimg.Tick(deltaTime);
       this.leftanim.Tick(deltaTime);
       this.walkright.Tick(deltaTime);
       
        if (newForce.y >= 0) {
            this.Force.y = 0;
        }

        if (this.othercollideBottom && newForce.y > 0)
        {
            if (CollisionComponentRectangle.DoRectanglesOverlap(this.collisioncomponent, this.othercollideBottom.collisioncomponent).collide)
            {
                newForce.y = 0;
                this.y = this.othercollideBottom.collisioncomponent.rectangle.y - 25;
                this.onground = true;
            }
            else
            {
                this.othercollideBottom = null;
            }
        }


        if (this.otherCollideBottomRespawn)
        {
            if (CollisionComponentRectangle.DoRectanglesOverlap(this.collisioncomponentRespawn, this.otherCollideBottomRespawn.collisioncomponent).collide)
            {
                if ( this.dir == MOVING.LEFT)
                {
                    this.resetoffset = window.level.currentXOffset;
                }
                else
                {
                    this.resetoffset = window.level.currentXOffset;
                }
                this.starty = this.y - 30;
                window.level.onground = true;
            }
            else
            {
                this.otherCollideBottomRespawn = null;
            }
        }

        if (this.othercollideLeft)
        {
            if (CollisionComponentRectangle.DoRectanglesOverlap(this.collisioncomponentLeft, this.othercollideLeft.collisioncomponent).collide)
            {
                window.level.blockleft = true;
            }
            else
            {
                this.othercollideLeft = null;
                window.level.blockleft = false;
            }
        }
        if (this.othercollideRight)
        {
            if (CollisionComponentRectangle.DoRectanglesOverlap(this.collisioncomponentRight, this.othercollideRight.collisioncomponent).collide)
            {
                window.level.blockright = true;
            }
            else
            {
                this.othercollideRight = null;
                window.level.blockright = false;
            }
        }

        if (this.keyboardControl.isKeyDown(KEYS.KEY_A))
        {
            if (this.dir != MOVING.LEFT)
            {
                this.dir = MOVING.LEFT;
                this.idleimg.Stop();
                this.walkright.Stop();
                this.leftanim.Play();
            }
        }
        else if (this.keyboardControl.isKeyDown(KEYS.KEY_D))
        {
            if (this.dir != MOVING.RIGHT)
            {
                this.dir = MOVING.RIGHT;
                this.idleimg.Stop();
                this.walkright.Play();
                this.leftanim.Stop();
            }
        }
        else
        {
            if (this.dir != MOVING.IDLE)
            {
                this.dir = MOVING.IDLE;
                this.idleimg.Play();
                this.walkright.Stop();
                this.leftanim.Stop();
            }
        }

        this.collisioncomponent.rectangle.x =  this.x + 4;
        this.collisioncomponent.rectangle.y = this.y + 28;
        this.collisioncomponentLeft.rectangle.x =  this.x - 4;
        this.collisioncomponentLeft.rectangle.y = this.y - 2;
        this.collisioncomponentRight.rectangle.x =  this.x + 30;
        this.collisioncomponentRight.rectangle.y = this.y - 2;

        this.collisioncomponentRespawn.rectangle.x = this.x + 12;
        this.collisioncomponentRespawn.rectangle.y = this.y + 28;

        this.y += newForce.y;

        this.Force = newForce;


        if (this.keyboardControl.isKeyDown(KEYS.KEY_W) && this.onground)
        {
            this.onground = false;
            window.level.onground = false;
            this.Force = new Vector2(0, -6.0);
        }

       if (this.y > 660)
       {
           this.NotifyDied(true);
       }

        super.Tick(deltaTime);
    }

    NotifyDied(force)
    {

        if (!force)
        {
            if (this.lastDeathTime <= 2.0)
            {
                return;
            }
        }

        this.lastDeathTime = 0.0;
        this.y = this.starty;
        this.hud.gametime += 10000;
        this.dir = MOVING.IDLE;
        this.onground = false;
        window.level.onground = false;
        this.Force = new Vector2(0,0);
        window.level.Reset(this.resetoffset);
    }

    DoCollide(other, point, owncollisioncomp)
    {
        if (other.id == 262 && !other.hide)
        {
            window.contentmngr.removeCollidableEventsObject(other.collisioncomponent);
            other.hide = true;
            this.hud.coins++;
            this.hud.gametime -= 5000;
        }
        else if (other.id == 6)
        {
            this.finishevent();
        }
        else if (other.id == 212)
        {
            this.NotifyDied(false);
        }
        else
        {
            if (other != this)
            {
                if (owncollisioncomp == this.collisioncomponent)
                {
                    this.othercollideBottom = other;
                }
                if (owncollisioncomp == this.collisioncomponentLeft)
                    this.othercollideLeft = other;
                if (owncollisioncomp == this.collisioncomponentRight)
                    this.othercollideRight = other;
                if (owncollisioncomp == this.collisioncomponentRespawn) 
                {
                    this.otherCollideBottomRespawn = other;
                }
            }

        }
    }

    Draw()
    {
        if (!this.initialized)
            return;

        if (this.dir == MOVING.IDLE)
            window.context2d.drawImage(this.idleimg.GetCurrentFrame(), this.x, this.y);
        else if (this.dir == MOVING.RIGHT)
            window.context2d.drawImage(this.walkright.GetCurrentFrame(), this.x, this.y);
        else if (this.dir == MOVING.LEFT)
            window.context2d.drawImage(this.leftanim.GetCurrentFrame(), this.x, this.y);

        super.Draw();
    }
}