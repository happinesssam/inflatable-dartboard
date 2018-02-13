namespace utterlySuperb.inflatableDartboard.ui.button{
    import Filter = PIXI.Filter;
    export interface ButtonConfigOptions{
        hitAreaGraphic?:PIXI.Sprite;        
        width?:number;
        height?:number;
        align?:string;
        hasToggle?:boolean;
        autoToggle?:boolean;
        overFilter?:Filter<{}>;
        downFilter?:Filter<{}>;
        disableFilter?:Filter<{}>;
        selectedFilter?:Filter<{}>;
        displayers?:string[];
    }
}