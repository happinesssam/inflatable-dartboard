namespace utterlySuperb.inflatableDartboard.ui.button{
    export interface ButtonOptionsBasicText extends ButtonDisplayOptions{
        upTextStyle:PIXI.TextStyle;
        overTextStyle?:PIXI.TextStyle;
        downTextStyle?:PIXI.TextStyle;
        disableTextStyle?:PIXI.TextStyle;
        selectedTextStyle?:PIXI.TextStyle;
        width?:number;
        height?:number;
        offsetX?:number;
        offsetY?:number;
        align?:string;
    }
}