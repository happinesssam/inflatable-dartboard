///<reference path="..\ui\text\TextField.ts"/>
namespace utterlySuperb.inflatableDartboard.test{
    import App = utterlySuperb.inflatableDartboard.app.App;
    import AppLoader = utterlySuperb.inflatableDartboard.app.utils.AppLoader;
    import AssetType = utterlySuperb.inflatableDartboard.app.utils.AssetType;
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import ButtonHelper = utterlySuperb.inflatableDartboard.ui.button.ButtonHelper;
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    import Sprite = PIXI.Sprite;
    export class TestApp{
        constructor(){
            let app:App = new App({renderWidth:800, renderHeight:600, containerId:"game"
            , configPath:"assets/data/config.json"});

            let appLoader:AppLoader = AppLoader.getInstance();

            appLoader.loadedSignal.add(this.assetsLoaded.bind(this));

            appLoader.startLoad();
        }

        private assetsLoaded():void{
            let tf:TextField = new TextField(500, 50, "c", {fill:0xFFFFFF, fontFamily:"KenVector Future"}, "hello");
            PixiManager.getInstance().stage.addChild(tf);

            let s:Sprite = Sprite.fromImage("assets/images/ui/blue_button00.png");
            PixiManager.getInstance().stage.addChild(s);

            let button:Button = ButtonHelper.getInstance().getButton("button0", "button0");
            PixiManager.getInstance().stage.addChild(button);
            button.y = 200;
            button.enable();
            console.log("sam", button)
        }
    }
}