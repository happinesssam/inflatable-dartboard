namespace utterlySuperb.inflatableDartboard.mainContent{
    import Container = PIXI.Container;
    import Widget = utterlySuperb.inflatableDartboard.ui.widgets.Widget;
    import WidgetDef = utterlySuperb.inflatableDartboard.ui.widgets.WidgetDef;
    import PageDef = utterlySuperb.inflatableDartboard.app.model.PageDef;
    //this should really be an interface
    export class MainContent extends Container{
        public currentContent:PageContent;

        constructor(){
            super();
        }

        public addPage(pageDef:PageDef):void{

        }

        public closeCurrent(allowNextCallback:()=>void, outCallback:(Page)=>void):void{
            this.currentContent.close(allowNextCallback, outCallback)
        }
    }
}