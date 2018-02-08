///<reference path="..\..\..\..\node_modules\@types\pixi.js\index.d.ts"/>
///<reference path="model\AppSettings.ts"/>

namespace utterlySuperb.inflatableDartboard.app{
    import Loader = PIXI.loaders.Loader;
    import AppSettings = utterlySuperb.inflatableDartboard.app.model.AppSettings;
    import AppSettingsOptions = utterlySuperb.inflatableDartboard.app.model.AppSettingsOptions;
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