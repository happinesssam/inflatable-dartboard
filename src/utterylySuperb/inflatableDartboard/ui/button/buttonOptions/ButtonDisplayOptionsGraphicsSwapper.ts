namespace utterlySuperb.inflatableDartboard.ui.button{
    import Point = PIXI.Point;
    export interface ButtonDisplayOptionsGraphicsSwapper extends ButtonDisplayOptions{
        upGraphic:string;
        overGraphic?:string;
        downGraphic?:string;
        disableGraphic?:string;
        selectedGraphic?:string;
        selectedOverGraphic?:string;
        selectedDownGraphic?:string;
        rotation?:number;
        flipX?:boolean;
        flipY?:boolean;
        centreAnchor?:boolean;
        depth?:number;
        noResize?:boolean;
    }
}