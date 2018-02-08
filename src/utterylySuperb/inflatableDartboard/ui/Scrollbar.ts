namespace utterlySuperb.inflatableDartboard.ui{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import ScrollbarConfig = utterlySuperb.inflatableDartboard.ui.interfaces.ScrollbarConfig;
    export class Scrollbar extends Container{
        private upButton:Button;
        private downButton:Button;
        private scrollbar:Button;
        private _enable:boolean;
        private _position:number;
        private moveStep:number;
        private range:number = -1;

        constructor(options:ScrollbarConfig){
            super();
            if(options.bg){
                let bg:Sprite = new Sprite(options.bg);
                this.addChild(bg);
            }
        }
    }
}