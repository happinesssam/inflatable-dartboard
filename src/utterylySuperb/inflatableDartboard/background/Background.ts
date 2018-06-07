namespace utterlySuperb.inflatableDartboard.background{
    import Container = PIXI.Container;
    export class Background extends Container{

        private defs:_.Dictionary<BackgroundConfig> = {};
        private currentBG:string;
        
        public addDef(def:BackgroundConfig):void{
            this.defs[def.id] = def;
        }

        public switchBackground(backgroundID:string):void{
            if(backgroundID==this.currentBG){
                return;
            }
        }
    }
}