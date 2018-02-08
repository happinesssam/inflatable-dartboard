namespace utterlySuperb.inflatableDartboard.ui.interfaces{
    import Filter = PIXI.Filter;
    export interface ButtonConfigOptions{
        upGraphic:PIXI.Sprite;
        overGraphic?:PIXI.Sprite;
        downGraphic?:PIXI.Sprite;
        disableGraphic?:PIXI.Sprite;
        selectedGraphic?:PIXI.Sprite;
        selectedOverGraphic?:PIXI.Sprite;
        selectedDownGraphic?:PIXI.Sprite;
        selectedDisableGraphic?:PIXI.Sprite;
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
        autoToggle?:boolean;
        overFilter?:Filter<{}>;
        downFilter?:Filter<{}>;
        disableFilter?:Filter<{}>;
        selectedFilter?:Filter<{}>;
    }
}