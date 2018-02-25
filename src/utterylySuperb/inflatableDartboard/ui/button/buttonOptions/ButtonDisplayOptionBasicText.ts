namespace utterlySuperb.inflatableDartboard.ui.button{
    import Point = PIXI.Point;
    export interface ButtonOptionsBasicText extends ButtonDisplayOptions{
        upTextStyle:PIXI.TextStyleOptions | string;
        overTextStyle?:PIXI.TextStyleOptions | string;
        downTextStyle?:PIXI.TextStyleOptions | string;
        disableTextStyle?:PIXI.TextStyleOptions | string;
        selectedTextStyle?:PIXI.TextStyleOptions | string;
        width?:number;
        height?:number;
        offsetX?:number;
        offsetY?:number;
        downOffset?:Point;
        align?:string;
    }
}