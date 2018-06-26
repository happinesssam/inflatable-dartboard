///<reference path="..\..\..\..\node_modules\@types\pixi.js\index.d.ts"/>
///<reference path="model\AppSettings.ts"/>
///<reference path="model\Page.ts"/>
///<reference path="model\PageDef.ts"/>
///<reference path="model\AppHistory.ts"/>
///<reference path="utils\AppLoader.ts"/>
///<reference path="utils\ConfigLoader.ts"/>
///<reference path="utils\Logs.ts"/>
///<reference path="..\mainContent\MainContent.ts"/>
///<reference path="..\ui\UI.ts"/>
///<reference path="..\background\Background.ts"/>

namespace utterlySuperb.inflatableDartboard.app{
    import Loader = PIXI.loaders.Loader;
    import AppSettings = utterlySuperb.inflatableDartboard.app.model.AppSettings;
    import AppLoader = utterlySuperb.inflatableDartboard.app.utils.AppLoader;
    import ConfigLoader = utterlySuperb.inflatableDartboard.app.utils.ConfigLoader;
    import AppSettingsOptions = utterlySuperb.inflatableDartboard.app.model.AppSettingsOptions;
    import MainContent = utterlySuperb.inflatableDartboard.mainContent.MainContent;
    import UI = utterlySuperb.inflatableDartboard.ui.UI;
    import Container = PIXI.Container;
    import Page = utterlySuperb.inflatableDartboard.app.model.Page;
    import PageDef = utterlySuperb.inflatableDartboard.app.model.PageDef;
    import GlobalDispatcher = utterlySuperb.inflatableDartboard.app.utils.GlobalDispatcher;
    import AppEvents = utterlySuperb.inflatableDartboard.app.model.AppEvents;
    import Background = utterlySuperb.inflatableDartboard.background.Background;
    import Logs = utterlySuperb.inflatableDartboard.app.utils.Logs;
    import AppHistory = utterlySuperb.inflatableDartboard.app.model.AppHistory;
    import WidgetDef = utterlySuperb.inflatableDartboard.ui.widgets.WidgetDef;
    export class App{
        public settings:AppSettings;
        private static _instance:App;
        private background:Background;
        private content:Container;
        private ui:UI;
        private currentPage:Page;
        private nextPage:string;
        protected pages:PageDef[] = [];

        constructor(options:AppSettingsOptions){
            Logs.shout("~~~APP STARTED~~~");
            App._instance = this;
            GlobalDispatcher.getInstance().add(AppEvents.SWITCH_PAGE, this.loadPage.bind(this));
            GlobalDispatcher.getInstance().add(AppEvents.GO_BACK, this.goBack.bind(this));
            this.settings = new AppSettings(options);
            this.addPageDefs();
            this.addWidgetDefs();
            this.initPixi();
            this.loadConfig();
        }

        protected startUp():void{
            let appLoader:AppLoader = AppLoader.getInstance();

            appLoader.loadedSignal.add(this.assetsLoaded.bind(this));

            appLoader.startLoad();
        }

        public static getInstance():App{
            return App._instance;
        }

        private loadConfig():void{
            if(this.settings.configPath){
                let configLoader:ConfigLoader = new ConfigLoader(this.settings.configPath);
                configLoader.completeSignal.add(this.configLoaded.bind(this));
            }else{
                this.configLoaded();
            }
        }

        private configLoaded():void{
            this.addPreloader();
            let appLoader:AppLoader = AppLoader.getInstance();   
            appLoader.configHasLoaded();            
        }

        protected addPreloader():void{
                     
        }

        private loadPage(pageId:string, fromBack:boolean = false):void{
            Logs.log("Load page:", pageId);
            if(this.nextPage){
                Logs.warn("Load page failed - switch already in process:", pageId, this.nextPage);
                return;
            }
            let nextPageDef:PageDef = _.find(this.pages, {id:pageId});
            if(!nextPageDef){
                Logs.error("Load page failed - page not defined:", pageId);
                return;
            }
            if(this.currentPage){
                if(this.currentPage.def.id==pageId){
                    return;
                }else{
                    this.nextPage = pageId;
                    if(!fromBack){
                        AppHistory.addToHistory(this.currentPage.def.id);
                    }
                    this.currentPage.close(this.addNextPage.bind(this), this.removeOldPage.bind(this));
                }
            }else{
                this.nextPage = pageId;
                this.addNextPage();
            }
        }

        private goBack(pageId:string):void{
            this.loadPage(pageId, true);
        }

        private addNextPage():void{
            let nextPageDef:PageDef = _.find(this.pages, {id:this.nextPage});
            if(nextPageDef){
                this.currentPage = new Page(nextPageDef);
                this.content.addChild(this.currentPage.mainContent);
                this.currentPage.mainContent.init();
                this.ui.checkWidgets(this.currentPage.def.widgets);
                this.background.switchBackground(this.currentPage.def.background);
            }
            this.nextPage = null;
        }

        private removeOldPage(oldPage:Page):void{
            Logs.whisper("Remove old page:", oldPage.def.id);
            this.content.removeChild(oldPage.mainContent);
            oldPage.cleanUp();
        }

        private assetsLoaded():void{
            Logs.log("Assets loaded");
            this.removePreloader();
            this.appReady();
        }

        protected appReady():void{
            let initialState:PageDef = _.find(this.pages, {initialState:true});
            GlobalDispatcher.getInstance().add(AppEvents.ON_RESIZE, this.onResize.bind(this));
            if(initialState)this.loadPage(initialState.id);
        }

        private onResize(resizeInfo:SizeInfo=null):void{
            this.currentPage.mainContent.onResize(resizeInfo);
        }

        
        protected removePreloader():void{
                     
        }

        private initPixi():void{
            let pixiManager:PixiManager = PixiManager.getInstance();
            pixiManager.initPixi(this.settings);
            this.background = new Background();
            pixiManager.stage.addChild(this.background);
            this.content = new Container();
            pixiManager.stage.addChild(this.content);
            this.ui =  UI.getInstance();//I'm not happy with this
            pixiManager.stage.addChild(this.ui);
        }

        protected addPageDefs():void{

        }

        protected addPageDef(id:string, mainContent:any, widgets:string[] = [], background:string = "", initialState:boolean = false):void{
            this.pages.push(new PageDef(id, mainContent, widgets, background, initialState));
        }

        protected addWidgetDefs():void{

        }

        protected addWidgetDef(widgetDef:WidgetDef):void{
            UI.getInstance().addWidgetDef(widgetDef);
        }
    }
}