///<reference path="../Button.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.interfaces{
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.interfaces.ButtonConfigOptions;
    import Texture = PIXI.Texture;
    export interface ScrollbarConfig{
        upButton?:ButtonConfigOptions;
        downButton?:ButtonConfigOptions;
        scrollbar:ButtonConfigOptions;
        bg?:Texture;
        height:number;
        step:number;
    }
}