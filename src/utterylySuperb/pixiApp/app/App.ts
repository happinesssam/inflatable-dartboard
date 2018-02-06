///<reference path="..\..\..\..\definitions\pixi.js.d.ts"/>
///<reference path="model\AppSettings.ts"/>

namespace utterlySuperb.pixiApp.app{
    import Loader = PIXI.loaders.Loader;
    import AppSettings = utterlySuperb.pixiApp.app.model.AppSettings;
    import AppSettingsOptions = utterlySuperb.pixiApp.app.model.AppSettingsOptions;
    export class App{
        private settings:AppSettings;

        constructor(options:AppSettingsOptions){
            this.settings = new AppSettings(options);
            this.initPixi();
        }

        private initPixi():void{
            let pixiManager:PixiManager = PixiManager.getInstance();
            pixiManager.initPixi(this.settings);
            console.log("pixiManager", pixiManager);
        }
    }
}