///<reference path="ButtonGraphicSwapper.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.button{
    import Container = PIXI.Container;
    export class ButtonIconDisplayer extends ButtonGraphicSwapper{

        public static DISPLAY_ID:string = "IconSwapper";

        protected switchGraphic(newGraphic:Container):void{
            if(newGraphic==this.currentGraphic) return;
            if(this.currentGraphic){
                this.button.textHolder.removeChild(this.currentGraphic);
            }
            this.button.textHolder.addChild(newGraphic);
            this.currentGraphic = newGraphic;
        }
    }
}