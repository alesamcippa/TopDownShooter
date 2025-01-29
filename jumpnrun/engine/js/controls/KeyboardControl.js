export const KEYS =
    {
        KEY_A: 0,
        KEY_S: 1,
        KEY_D: 2,
        KEY_W: 3
    };

export default class KeyboardControl
{
    constructor()
    {
        document.keyArray = [];
    }
    
    static convertKey(key)
    {
        switch (key.toUpperCase())
        {
            case "A":
                return KEYS.KEY_A;
            case "S":
                return KEYS.KEY_S;
            case "D":
                return KEYS.KEY_D;
            case "W":
                return KEYS.KEY_W;
            default:
                return 99;
        }
    }

    activateKeyIntercept()
    {
        document.onkeydown = function(e)
        {
            document.keyArray[KeyboardControl.convertKey(e.key)] = true;
        };
        document.onkeyup = function(e)
        {
            document.keyArray[KeyboardControl.convertKey(e.key)] = false;
        };
    }
    
    isKeyDown(key)
    {
        return document.keyArray[key];
    }

}


