
export default class AnimatedImage
{
    constructor(images, fps)
    {
        this.frametime = (1000.0 / fps) / 1000.0;
        this.images = images;
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    Tick(deltaTime)
    {
        if (this.paused)
            return;

        this.elapsedTime += deltaTime;

        if (this.elapsedTime >= this.frametime)
        {
            this.elapsedTime = 0;
            this.currentFrame++;

            if (this.currentFrame >= this.images.length)
                this.currentFrame = 0;
        }
    }

    Pause()
    {
        this.paused = true;
    }

    Stop()
    {
        this.paused = true;
        this.currentFrame = 0;
        this.elapsedTime = 0;
    }

    Play()
    {
        this.paused = false;
    }

    GetCurrentFrame()
    {
        return this.images[this.currentFrame];
    }
}