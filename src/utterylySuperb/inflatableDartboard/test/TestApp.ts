namespace utterlySuperb.inflatableDartboard.test{
    import App = utterlySuperb.inflatableDartboard.app.App;
    import AppLoader = utterlySuperb.inflatableDartboard.app.utils.AppLoader;
    import AssetType = utterlySuperb.inflatableDartboard.app.utils.AssetType;
    export class TestApp{
        constructor(){
            let app:App = new App({renderWidth:800, renderHeight:600, containerId:"game"});

            let appLoader:AppLoader = AppLoader.getInstance();

            appLoader.addAsset("css/fonts.css", "kenney", AssetType.font);

            appLoader.loadedSignal.add(this.assetsLoaded.bind(this));

            appLoader.startLoad();
        }

        private assetsLoaded():void{
            alert("loaded");
        }
    }
}