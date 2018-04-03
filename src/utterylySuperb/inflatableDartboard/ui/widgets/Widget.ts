namespace utterlySuperb.inflatableDartboard.ui.widgets{
    import Container = PIXI.Container;
    import IPoint = utterlySuperb.inflatableDartboard.utils.interfaces.IPoint;
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    import SizeInfo = utterlySuperb.inflatableDartboard.app.SizeInfo;
    import GlobalDispatcher = utterlySuperb.inflatableDartboard.app.utils.GlobalDispatcher;
    export class Widget extends Container{
        public id:string;
        public align:string = "c";
        public offset:IPoint;
        public positionBySize:boolean;
        public onPixel:boolean;
        private onResizeBound:()=>void;
        private hasOwnResizeHandler:boolean;

        constructor(){
            super();
            this.onResizeBound = this.onResize.bind(this)
            
        }

        /**
         * In case I want to use one outside of WidgetController
         */
        public addResizeListener():void{
            if(!this.hasOwnResizeHandler){
                GlobalDispatcher.getInstance().add(PixiManager.ON_RESIZE, this.onResizeBound);
                this.hasOwnResizeHandler = true;
            }
        }

        public cleanUp():void{
            if(this.hasOwnResizeHandler){
                GlobalDispatcher.getInstance().remove(PixiManager.ON_RESIZE, this.onResizeBound);
                this.hasOwnResizeHandler = false;
            }            
        }

        protected onResize(resizeInfo:SizeInfo=null):void{
            if(!resizeInfo) resizeInfo = PixiManager.getInstance().getSizeInfo();
            let posWidth:number = this.positionBySize ? this.width : 0;
            let posHeight:number = this.positionBySize ? this.height : 0;
            switch(this.align.charAt(0)){
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
            if(this.align.length==2){
                switch(this.align.charAt(1)){
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
            if(this.offset){
                this.x+=this.offset.x;
                this.y+=this.offset.y;
            }
            if(this.onPixel){
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
            }
        }
    }
}