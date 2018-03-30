///<reference path="ButtonGraphicSwapper.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.button{
    import Container = PIXI.Container;
    export class ButtonIconDisplayer extends ButtonGraphicSwapper{

        public static DISPLAY_ID:string = "IconSwapper";

        protected addContainer():void{
            this.button.textHolder.addChild(this.holder);
        }
    }
}