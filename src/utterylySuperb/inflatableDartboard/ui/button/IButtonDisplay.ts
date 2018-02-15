namespace utterlySuperb.inflatableDartboard.ui.button{
    export interface IButtonDisplay{
        init(button:Button, displayerOptions:ButtonDisplayOptions):void;
        setState(button:Button, state:ButtonState):void;
        setText(newText:string, button:Button, displayId?:string):void;
    }
}