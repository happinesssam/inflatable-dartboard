///<reference path="Widget.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.widgets{
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import AppHistory = utterlySuperb.inflatableDartboard.app.model.AppHistory;
    import Logs = utterlySuperb.inflatableDartboard.app.utils.Logs;
    export class BackButton extends Widget{
        public static BACK_BUTTON:string="backButton";

        protected button:Button;

        protected init():void{
            this.button = UIHelper.getInstance().getButton(BackButton.BACK_BUTTON, "Back");
            if(!this.button){
                Logs.error("Attempt to create back widget with no back button defined");
                return;
            }
            this.button.onUp.add(this.clickBack.bind(this));
            this.addChild(this.button);
            this.comeIn();
        }

        protected clickBack():void{
            AppHistory.goBack();
        }

        protected comeIn():void{
            this.enable();
        }

        protected enable():void{
            this.button.enable();
        }

        public remove(outCallback:()=>void):void{
            this.button.disable();
            outCallback();
        }

        public cleanUp():void{
            this.button.destroy();
        }

        public static getDef():WidgetDef{
            let def:WidgetDef = new WidgetDef(BackButton.BACK_BUTTON, BackButton, "tl",  {x:20, y:20});
            def.onPixel = true;

            return def;
        }
    }
}