namespace utterlySuperb.inflatableDartboard.app.model{
    import Widget = utterlySuperb.inflatableDartboard.ui.widgets.Widget;
    import PageContent = utterlySuperb.inflatableDartboard.mainContent.PageContent;
    export class Page{
        public mainContent:PageContent;
        public def:PageDef;

        constructor(def:PageDef){
            this.def = def;
            this.mainContent = new def.mainContent(this) as PageContent;
        }

        public close(allowNextCallback:()=>void, outCallback:(Page)=>void):void{
            this.mainContent.close(allowNextCallback, outCallback);
        }

        public cleanUp():void{
            this.mainContent.cleanUp();
        }
    }
}