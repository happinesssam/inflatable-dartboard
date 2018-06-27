///<reference path="../app/utils/GlobalDispatcher.ts"/>
///<reference path="../app/PixiManager.ts"/>

namespace utterlySuperb.inflatableDartboard.ui
{
    import Container = PIXI.Container;
    import SizeInfo = utterlySuperb.inflatableDartboard.app.SizeInfo;
    import GlobalDispatcher = utterlySuperb.inflatableDartboard.app.utils.GlobalDispatcher;
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    import Widget = utterlySuperb.inflatableDartboard.ui.widgets.Widget;
    import WidgetDef = utterlySuperb.inflatableDartboard.ui.widgets.WidgetDef;
    import AppEvents = utterlySuperb.inflatableDartboard.app.model.AppEvents;
    import Logs = utterlySuperb.inflatableDartboard.app.utils.Logs;
    /**
     * This is just the top layer container. It can is mostly for widgets
     */
    export class UI extends Container{

        private widgets:Widget[] = [];
        private widgetDefs:_.Dictionary<WidgetDef> = {};

        private static _instance:UI;//sooooo many singletons.
        public static getInstance():UI{
            if(!UI._instance)UI._instance = new UI();
            return UI._instance;
        }

        constructor(){
            super();
            GlobalDispatcher.getInstance().add(AppEvents.ON_RESIZE, this.onResize.bind(this));
        }

        public checkWidgets(currentPageWidgets:string[]):void{
            let activeWidget:Widget[] = _.clone(this.widgets);
            _.forEach(activeWidget, (widget:Widget)=>{
                if(currentPageWidgets.indexOf(widget.def.id)==-1 && !widget.def.permanent){
                    this.doWidgetRemove(widget);
                }
            });
            _.forEach(currentPageWidgets, (widgetId:string)=>{
                if(!this.hasWidget(widgetId)){
                    this.addWidget(widgetId);
                }
            });
        }

        public addWidgetDef(widgetDef:WidgetDef):void{
            this.widgetDefs[widgetDef.id] = widgetDef;
        }

        public addWidget(widgetId:string):void{
            if(this.hasWidget(widgetId)){
                Logs.warn("Attempt to create widget " + widgetId + " that already exists");
                return;
            }
            let widgetDef:WidgetDef = this.widgetDefs[widgetId];
            if(widgetDef){
                let widget:Widget = new widgetDef.content(widgetDef);
                this.addChild(widget);
                this.widgets.push(widget);
                Logs.whisper("Added widget", widget);
            }else{
                Logs.warn("Attempt to create widget " + widgetId + " that does not have def");
            }
        }

        public removeWidget(widgetId:string):void{
            let widget:Widget = _.find(this.widgets, {id:widgetId});
            if(widget){                
                this.doWidgetRemove(widget);
            }
        }

        public hasWidget(widgetId:string):boolean{
            return !_.isUndefined(_.find(this.widgets, {id:widgetId}));
        }

        private doWidgetRemove(widget:Widget):void{
            _.remove(this.widgets, widget);
            widget.remove(()=>{
                widget.cleanUp();
                this.removeChild(widget);
                Logs.whisper("Removed widget", widget);
            });
        }

        protected onResize(resizeInfo:SizeInfo=null):void{
            _.forEach(this.widgets, (widget:Widget)=>{
                widget.onResize(resizeInfo);
            });
        }
    }
}