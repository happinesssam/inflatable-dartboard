namespace utterlySuperb.inflatableDartboard.app.model{
    import IPoint = utterlySuperb.inflatableDartboard.utils.interfaces.IPoint;
    export class AppSettings{
        public renderWidth:number = 800;
        public renderHeight:number = 600;
        public rendererMax:IPoint = {x:1280, y:600};
        public rendererMin:IPoint = {x:800, y:400};
        public fillType:string = AppSettings.LETTER_BOX;
        public appWidth:number = 800;
        public appHeight:number = 600;
        public antialias:boolean = true;
        public containerId:string;
        public configPath:string;

        public static NO_RESIZE:string = "noResize";
        public static STRETCH:string = "stretch";
        public static BEST_FIT:string = "bestFit";
        public static LETTER_BOX:string = "letterBox";

        constructor(options:AppSettingsOptions){
            for(var i in options){
                this[i] = options[i];
            }
            if(!this.rendererMax){
                if(!this.renderWidth || !this.renderHeight){
                    if(this.rendererMin){
                        this.renderWidth = this.rendererMin.x;
                        this.renderHeight = this.rendererMin.y;
                    }else {
                        console.error("renderer needs to have dimensions");
                        this.renderWidth = 800;
                        this.renderHeight = 600;
                    }
                }
                this.rendererMax = {x:this.renderWidth, y:this.renderHeight};
            }
            if(!this.rendererMin){
                if(!this.renderWidth || !this.renderHeight){
                    this.renderWidth = this.rendererMax.x;
                    this.renderHeight = this.rendererMax.y;
                }
                this.rendererMin = {x:this.renderWidth, y:this.renderHeight};
            }
            if(this.rendererMax.x<this.rendererMin.x || this.rendererMax.y<this.rendererMin.y){
                throw("renderer min dimensions cannot be smaller than max dimensions")
            }
        }
    }
}