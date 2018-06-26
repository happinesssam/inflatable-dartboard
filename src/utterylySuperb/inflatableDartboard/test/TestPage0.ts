namespace utterlySuperb.inflatableDartboard.test{
    import PageContent = utterlySuperb.inflatableDartboard.mainContent.PageContent;
    import AppLoader = utterlySuperb.inflatableDartboard.app.utils.AppLoader;
    import AssetType = utterlySuperb.inflatableDartboard.app.utils.AssetType;
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import Scrollbar = utterlySuperb.inflatableDartboard.ui.Scrollbar;
    import UIHelper = utterlySuperb.inflatableDartboard.ui.UIHelper;
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    import Sprite = PIXI.Sprite;
    export class TestPage0 extends PageContent{
        public init():void{
            let tf:TextField = new TextField(500, 50, "c", UIHelper.getInstance().getTextOptions("buttonText0"), "hello");
            PixiManager.getInstance().stage.addChild(tf);
            tf.text="rete";

            let s:Sprite = Sprite.fromImage("assets/images/ui/blue_button00.png");
            this.addChild(s);

            let button:Button = UIHelper.getInstance().getButton("button0", "biatch");
            this.addChild(button);
            button.y = 200;
            button.setText("hello");
            button.enable();
            button.onClick.add(this.onClick.bind(this));
            button.clickTime = 500;
            console.log("sam", button);

            let scrollbar:Scrollbar = new Scrollbar(UIHelper.getInstance().getMiscOb("scrollbar0"),
        200);
            this.addChild(scrollbar);
            scrollbar.enable();
        }

        private onClick(button:Button):void{
            console.log("sam", button)
        }
    }
}