export default class SoundPlayer
{
    constructor(sounds)
    {
        function compareActorList(a, b) {
            if (a.id < b.id) {
                return -1;
            } else if (a.id > b.id) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }

        for (let i = 0; i < sounds.length; i++)
        {
            sounds[i].sound = new Audio(sounds[i].soundName);
        }

        sounds.sort(compareActorList);
        this.LoadedSounds = sounds;
    }

    AddSound(sound)
    {
        sound.sound = new Audio(sound.soundName);
        this.LoadedSounds.push(sound);
        this.LoadedSounds.sort(compareActorList);
    }

    PlaySound(idx)
    {
        this.LoadedSounds[idx].sound.cloneNode(true).play();
    }

    PlaySoundByName(name)
    {
        var result = this.LoadedSounds.find(item => item.soundName == name);
        if (result)
            result.sound.cloneNode(true).play();
    }
}



export class SoundClass
{
    constructor(id, soundName)
    {
        this.id = id;
        this.soundName = soundName;
        this.sound = null;
    }
}