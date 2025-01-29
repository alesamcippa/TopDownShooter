export class CollisionComponent
{
    constructor(owner)
    {
        this.owner = owner;
    }

    DoCollide(other, point, owncollisioncomp)
    {
        if (this.owner && other && other.owner && typeof this.owner.DoCollide === 'function')
        {
            this.owner.DoCollide(other.owner, point, owncollisioncomp);
        }
    }
}