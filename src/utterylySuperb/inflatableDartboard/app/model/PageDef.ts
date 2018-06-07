namespace utterlySuperb.inflatableDartboard.app.model{
    import WidgetDef = utterlySuperb.inflatableDartboard.ui.widgets.WidgetDef;
    import BackgroundConfig = utterlySuperb.inflatableDartboard.background.BackgroundConfig;
    export class PageDef{
        public id:string;
        public mainContent:any;
        public background:string;
        public initialState:boolean;
        public widgets:string[] = [];

        constructor(id:string, mainContent:any, widgets:string[] = [], background:string = "", initialState:boolean = false){
            this.id = id;
            this.mainContent = mainContent;
            this.widgets = widgets;
            this.initialState = initialState;
            this.background = background;
        }
    }
}