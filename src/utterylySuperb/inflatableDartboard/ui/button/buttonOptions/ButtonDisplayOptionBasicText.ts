namespace utterlySuperb.inflatableDartboard.ui.button{
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
        align?:string;
    }
}