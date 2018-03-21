namespace utterlySuperb.inflatableDartboard.ui.button{
    export interface IButtonDisplay{
        init(button:Button, displayerOptions:ButtonDisplayOptions):void;
        setState(state:ButtonState):void;
        setText(newText:string, displayId?:string):void;
        buttonDimensionChange():void;
        setDisplayerDimensions(width:number, height:number):void;
        cleanUp():void;
        id:string;
        button:Button;
    }
}