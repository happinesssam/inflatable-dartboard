namespace utterlySuperb.inflatableDartboard.background{
    export interface BackgroundConfig{
        id:string;
        assetLink:string;
        exitType:string;
        introType:string; 
    }

    export enum BackgroundInOut{
        none,
        fade,
        scale,
        tween
    }
}