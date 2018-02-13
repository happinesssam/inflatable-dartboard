namespace utterlySuperb.inflatableDartboard.ui.button{
    export interface IButtonDisplay{
        init(button:Button, displayerOptions:ButtonDisplayOptions):void;
        displayUp(button:Button):void;
        displayOver(button:Button):void;
        displayDown(button:Button):void;
        displayDisabled(button:Button):void;
        displaySelected(button:Button):void;
        displaySelectedOver(button:Button):void;
        displaySelectedDown(button:Button):void;
        setText(newText:string, button:Button):void;
    }
}