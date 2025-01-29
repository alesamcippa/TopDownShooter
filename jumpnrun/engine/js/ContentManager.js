export default class ContentManager
{
    constructor()
    {
        this.TickableObjects = [];
        this.DrawableObjects = [];
        this.CollidableEventsObjects = [];
    }

    addTickableObject(toAdd)
    {
        this.TickableObjects.push(toAdd);
    }
    removeTickableObject(toRemove)
    {
        let idx = this.TickableObjects.indexOf(toRemove);
        if (idx < 0)
            return;
        delete this.TickableObjects[idx];
    }

    compareActorList(a, b) {
    if (a.renderpriority < b.renderpriority) {
        return -1;
    } else if (a.renderpriority > b.renderpriority) {
        return 1;
    }
    // a must be equal to b
    return 0;
}

    addDrawableObject(toAdd)
    {
        this.DrawableObjects.push(toAdd);

        this.DrawableObjects.sort(this.compareActorList);
    }
    removeDrawableObject(toRemove)
    {
        let idx = this.DrawableObjects.indexOf(toRemove);
        if (idx < 0)
            return;
        delete this.DrawableObjects[idx];

        this.DrawableObjects.sort(this.compareActorList);
    }

    addCollidableEventsObject(toAdd)
    {
        this.CollidableEventsObjects.push(toAdd);
    }
    removeCollidableEventsObject(toRemove)
    {
        let idx = this.CollidableEventsObjects.indexOf(toRemove);
        if (idx < 0)
            return;
        delete this.CollidableEventsObjects[idx];
    }

}