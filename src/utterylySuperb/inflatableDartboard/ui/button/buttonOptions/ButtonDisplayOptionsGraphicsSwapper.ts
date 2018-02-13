namespace utterlySuperb.inflatableDartboard.ui.button{
    export interface ButtonDisplayOptionsGraphicsSwapper extends ButtonDisplayOptions{
        upGraphic:PIXI.Texture;
        overGraphic?:PIXI.Texture;
        downGraphic?:PIXI.Texture;
        disableGraphic?:PIXI.Texture;
        selectedGraphic?:PIXI.Texture;
        selectedOverGraphic?:PIXI.Texture;
        selectedDownGraphic?:PIXI.Texture;
    }
}