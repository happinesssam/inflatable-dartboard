namespace utterlySuperb.inflatableDartboard.ui.interfaces{
    export interface IButton extends IUIComponent{
        enable():void;
        disable(showDisabled:boolean):void;
        setDimensions(width:number, height:number):void;
        setText(newText:string, displayId?:string):void;
    }
}