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
        downOffset?:Point;
        overOffset?:Point;
        disableOffset?:Point;
        selectedOffset?:Point;
        depth?:number;
        noResize?:boolean;
    }
}