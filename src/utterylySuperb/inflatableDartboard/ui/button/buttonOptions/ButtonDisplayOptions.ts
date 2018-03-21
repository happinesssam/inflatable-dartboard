namespace utterlySuperb.inflatableDartboard.ui.button{
    import Point = PIXI.Point;
    export interface ButtonDisplayOptions{
        class:string;
        align?:string;
        offsetX?:number;
        offsetY?:number;
        width?:number;
        height?:number;
        id:string;
        downOffset?:Point;
        overOffset?:Point;
        disableOffset?:Point;
        selectedOffset?:Point;
    }
}