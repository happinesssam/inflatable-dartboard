namespace utterlySuperb.inflatableDartboard.mainContent{
    import Container = PIXI.Container;
    import Widget = utterlySuperb.inflatableDartboard.ui.widgets.Widget;
    import WidgetDef = utterlySuperb.inflatableDartboard.ui.widgets.WidgetDef;
    import Page = utterlySuperb.inflatableDartboard.app.model.Page;
    //this should really be an interface
    export class PageContent extends Container{
        public myPage:Page;

        constructor(myPage:Page){
            super();
            this.myPage = myPage;
        }

        /**
         * Called after content has been added to stage
         */
        public init():void{

        }

        public close(allowNextCallback:()=>void, outCallback:(Page)=>void):void{
            allowNextCallback();
            outCallback(this.myPage);
        }

        public cleanUp():void{

        }
    }
}