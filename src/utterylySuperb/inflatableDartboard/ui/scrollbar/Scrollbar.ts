namespace utterlySuperb.inflatableDartboard.ui{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Texture = PIXI.Texture;
    import ScrollbarConfig = utterlySuperb.inflatableDartboard.ui.interfaces.ScrollbarConfig;
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import ButtonHelper = utterlySuperb.inflatableDartboard.ui.button.ButtonHelper;
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonConfigOptions;
    import TextureHelper = utterlySuperb.inflatableDartboard.app.utils.TextureHelper;
    export class Scrollbar extends Container{
        private upButton:Button;
        private downButton:Button;
        private scrollbar:Button;
        private bg:Container;
        private _enable:boolean;
        private _position:number;
        private moveStep:number;
        private range:number = -1;

        constructor(options:ScrollbarConfig){
            super();
            if(options.bg){
                if(options.bg instanceof Texture){
                    this.bg = new Sprite(options.bg);
                }else{
                    this.bg = TextureHelper.getInstance().getAsset(options.bg);
                }
                this.addChild(this.bg);
            }
            if(options.upButton){
                if(typeof options.upButton == "string"){
                    this.upButton = ButtonHelper.getInstance().getButton(options.upButton);
                }else{
                    this.upButton = new Button(options.upButton);
                }
                this.addChild(this.upButton);
            }
        }

        public enable():void{

        }

        public disable():void{
            
        }

        public setDimensions(width:number, height:number):void{
            if(this.bg){
                this.bg.width = width;
                this.bg.height = height;
            }
        }
    }
}