///<reference path="../button/buttonOptions/ButtonConfigOptions.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.interfaces{
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonConfigOptions;
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