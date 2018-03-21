namespace utterlySuperb.inflatableDartboard.ui.button{
   
    export interface ButtonConfigOptions{      
        width:number;
        height:number;
        align?:string;
        hasToggle?:boolean;
        autoToggle?:boolean;
        displayers?:string[];
        hitArea?:string;
        downOffset?:Point;
        overOffset?:Point;
        disableOffset?:Point;
        selectedOffset?:Point;
    }
}