namespace utterlySuperb.inflatableDartboard.ui.widgets{
    import Container = PIXI.Container;
    import SizeInfo = utterlySuperb.inflatableDartboard.app.SizeInfo;
    import GlobalDispatcher = utterlySuperb.inflatableDartboard.app.utils.GlobalDispatcher;
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    export class WidgetsController{
        private container:Container;

        constructor(container:Container){
            this.container = container;
            GlobalDispatcher.getInstance().add(PixiManager.ON_RESIZE, this.onResize.bind(this));
        }

        public addWidget(widget:Widget):void{

        }

        public removeWidget(widget:Widget):void{

        }

        protected onResize(resizeInfo:SizeInfo=null):void{
        }
    }
}