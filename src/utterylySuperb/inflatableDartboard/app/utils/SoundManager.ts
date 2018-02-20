namespace utterlySuperb.inflatableDartboard.app.utils{
    export class SoundManager{
        private static _instance:SoundManager;

        private howls:_.Dictionary<Howl> = {};

        public static getInstance():SoundManager{
            if(!SoundManager._instance)SoundManager._instance = new SoundManager();
            return SoundManager._instance;
        }

        public addSound(src:string[], id:string, loadCallback:()=>void):void{
            var sound:Howl = new Howl({
                src: src
            });
            
            // Clear listener after first call.
            sound.once('load', loadCallback);
            this.howls[id] = sound;
        }

        public addSoundSprite():void{

        }
    }
}