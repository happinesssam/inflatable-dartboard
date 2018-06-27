///<reference path="../button/buttonOptions/ButtonConfigOptions.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.interfaces{
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonConfigOptions;
    import Texture = PIXI.Texture;
    export interface ScrollbarConfig{
        upButton?:ButtonConfigOptions | string;
        downButton?:ButtonConfigOptions | string;
        scrollbar:ButtonConfigOptions | string;
        bg?:Texture | string;
        width:number;
        step:number;
        buttonsHeight?:number;
        flipUpIcon?:boolean;
        flipDownIcon?:boolean;
    }
}