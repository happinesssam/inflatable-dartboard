namespace utterlySuperb.inflatableDartboard.ui.button{
    import Point = PIXI.Point;
    export interface ButtonOptionsBasicText extends ButtonDisplayOptions{
        upTextStyle:PIXI.TextStyleOptions;
        overTextStyle?:PIXI.TextStyleOptions;
        downTextStyle?:PIXI.TextStyleOptions;
        disableTextStyle?:PIXI.TextStyleOptions;
        selectedTextStyle?:PIXI.TextStyleOptions;
        width?:number;
        height?:number;
        offsetX?:number;
        offsetY?:number;
        downOffset?:Point;
        align?:string;
    }
}