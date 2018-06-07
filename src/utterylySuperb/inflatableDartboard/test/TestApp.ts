///<reference path="..\ui\text\TextField.ts"/>
namespace utterlySuperb.inflatableDartboard.test{
    import App = utterlySuperb.inflatableDartboard.app.App;
    import AppLoader = utterlySuperb.inflatableDartboard.app.utils.AppLoader;
    import AssetType = utterlySuperb.inflatableDartboard.app.utils.AssetType;
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import UIHelper = utterlySuperb.inflatableDartboard.ui.UIHelper;
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    import Sprite = PIXI.Sprite;
    export class TestApp extends App{
        constructor(){
            super({renderWidth:800, renderHeight:600, containerId:"game"
            , configPath:"assets/data/config.json"});

            this.startUp();
        }

        protected appReady():void{
            let tf:TextField = new TextField(500, 50, "c", UIHelper.getInstance().getTextOptions("buttonText0"), "hello");
            PixiManager.getInstance().stage.addChild(tf);
            tf.text="rete";

            let s:Sprite = Sprite.fromImage("assets/images/ui/blue_button00.png");
            PixiManager.getInstance().stage.addChild(s);

            let button:Button = UIHelper.getInstance().getButton("button0", "biatch");
            PixiManager.getInstance().stage.addChild(button);
            button.y = 200;
            button.setText("hello");
            button.enable();
            console.log("sam", button)
        }
    }
}