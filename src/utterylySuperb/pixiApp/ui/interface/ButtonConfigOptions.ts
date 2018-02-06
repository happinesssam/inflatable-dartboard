namespace utterlySuperb.pixiApp.ui.interfaces{
    export interface ButtonConfigOptions{
        upGraphic:PIXI.Sprite;
        overGraphic?:PIXI.Sprite;
        downGraphic?:PIXI.Sprite;
        disableGraphic?:PIXI.Sprite;
        selectedGraphic?:PIXI.Sprite;
        hitAreaGraphic?:PIXI.Sprite;
        upTextStyle?:PIXI.TextStyle;
        overTextStyle?:PIXI.TextStyle;
        downTextStyle?:PIXI.TextStyle;
        disableTextStyle?:PIXI.TextStyle;
        selectedTextStyle?:PIXI.TextStyle;
        width?:number;
        height?:number;
        align?:string;
        hasToggle?:boolean;
    }
}