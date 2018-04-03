///<reference path="..\..\..\..\node_modules\@types\pixi.js\index.d.ts"/>
///<reference path="model\AppSettings.ts"/>
///<reference path="utils\AppLoader.ts"/>
///<reference path="utils\ConfigLoader.ts"/>

namespace utterlySuperb.inflatableDartboard.app{
    import Loader = PIXI.loaders.Loader;
    import AppSettings = utterlySuperb.inflatableDartboard.app.model.AppSettings;
    import AppLoader = utterlySuperb.inflatableDartboard.app.utils.AppLoader;
    import ConfigLoader = utterlySuperb.inflatableDartboard.app.utils.ConfigLoader;
    import AppSettingsOptions = utterlySuperb.inflatableDartboard.app.model.AppSettingsOptions;
    import Container = PIXI.Container;
    export class App{
        public settings:AppSettings;
        private static _instance:App;
        private background:Container;
        private content:Container;
        private ui:Container;

        constructor(options:AppSettingsOptions){
            App._instance = this;
            this.settings = new AppSettings(options);
            this.initPixi();
            this.loadConfig();
        }

        public static getInstance():App{
            return App._instance;
        }

        private loadConfig():void{
            if(this.settings.configPath){
                let configLoader:ConfigLoader = new ConfigLoader(this.settings.configPath);
            }else{
                AppLoader.getInstance().configHasLoaded();
            }
        }

        private initPixi():void{
            let pixiManager:PixiManager = PixiManager.getInstance();
            pixiManager.initPixi(this.settings);
            this.background = new Container();
            pixiManager.stage.addChild(this.background);
            this.content = new Container();
            pixiManager.stage.addChild(this.content);
            this.ui = new Container();
            pixiManager.stage.addChild(this.content);
        }
    }
}