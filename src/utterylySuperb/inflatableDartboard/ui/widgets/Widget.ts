namespace utterlySuperb.inflatableDartboard.ui.widgets{
    import Container = PIXI.Container;
   
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    import AppEvents = utterlySuperb.inflatableDartboard.app.model.AppEvents;
    import SizeInfo = utterlySuperb.inflatableDartboard.app.SizeInfo;
    import GlobalDispatcher = utterlySuperb.inflatableDartboard.app.utils.GlobalDispatcher;
    export class Widget extends Container{
        public id:string;        
        public def:WidgetDef;
        private onResizeBound:()=>void;
        private hasOwnResizeHandler:boolean;

        constructor(def:WidgetDef){
            super();
            this.def = def;
            this.init();
            this.onResizeBound = this.onResize.bind(this);   
            this.onResize(PixiManager.getInstance().getSizeInfo());        
        }

        protected init():void{

        }

        /**
         * In case I want to use one outside of WidgetController
         */
        public addResizeListener():void{
            if(!this.hasOwnResizeHandler){
                GlobalDispatcher.getInstance().add(AppEvents.ON_RESIZE, this.onResizeBound);
                this.hasOwnResizeHandler = true;
            }
        }

        public cleanUp():void{
            if(this.hasOwnResizeHandler){
                GlobalDispatcher.getInstance().remove(AppEvents.ON_RESIZE, this.onResizeBound);
                this.hasOwnResizeHandler = false;
            }            
        }

        public remove(outCallback:()=>void):void{
            outCallback();
        }

        public onResize(resizeInfo:SizeInfo=null):void{
            if(!resizeInfo) resizeInfo = PixiManager.getInstance().getSizeInfo();
            let posWidth:number = this.def.positionBySize ? this.width : 0;
            let posHeight:number = this.def.positionBySize ? this.height : 0;
            switch(this.def.align.charAt(0)){
                case "t":
                this.y = 0;
                break;
                case "b":
                this.y =  resizeInfo.rendererHeight - posHeight;
                break;
                default:
                this.y = (resizeInfo.rendererHeight - posHeight)/2;
                break;
            }
            if(this.def.align.length==2){
                switch(this.def.align.charAt(1)){
                    case "l":
                    this.x = 0;
                    break;
                    case "r":
                    this.x = resizeInfo.rendererWidth - posWidth;
                    break;
                    default:
                    this.x = (resizeInfo.rendererWidth - posWidth)/2;
                    break;
                }
            }else{
                this.x = (resizeInfo.rendererWidth - posWidth)/2;
            }
            if(this.def.offset){
                this.x+=this.def.offset.x;
                this.y+=this.def.offset.y;
            }
            if(this.def.onPixel){
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
            }
        }
    }
}