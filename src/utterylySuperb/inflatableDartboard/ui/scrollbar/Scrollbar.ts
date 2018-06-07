namespace utterlySuperb.inflatableDartboard.ui{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Texture = PIXI.Texture;
    import ScrollbarConfig = utterlySuperb.inflatableDartboard.ui.interfaces.ScrollbarConfig;
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import UIHelper = utterlySuperb.inflatableDartboard.ui.UIHelper;
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonConfigOptions;
    import TextureHelper = utterlySuperb.inflatableDartboard.app.utils.TextureHelper;
    import InteractionEvent = PIXI.interaction.InteractionEvent;
    export class Scrollbar extends Container{
        private upButton:Button;
        private downButton:Button;
        private scrollbar:Button;
        private bg:Container;
        private _enable:boolean;
        private _progress:number;
        private moveStep:number;
        private moveDist:number;
        private top:number = 0;
        private useInts:boolean;
        private range:number = 1;
        private scrollStartY:number;
        private scrolling:boolean;
        private onScrollBound:()=>void;

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
                    this.upButton = UIHelper.getInstance().getButton(options.upButton);
                }else{
                    this.upButton = new Button(options.upButton);
                }
                this.addChild(this.upButton);
                this.upButton.onUp.add(this.onStep.bind(this));
            }
            if(options.downButton){
                if(typeof options.downButton == "string"){
                    this.downButton = UIHelper.getInstance().getButton(options.downButton);
                }else{
                    this.downButton = new Button(options.downButton);
                }
                this.addChild(this.downButton);
                this.downButton.onUp.add(this.onStep.bind(this));
            }
            if(typeof options.scrollbar == "string"){
                this.scrollbar = UIHelper.getInstance().getButton(options.scrollbar);
            }else{
                this.scrollbar = new Button(options.scrollbar);
            }
            this.scrollbar.onUp.add(this.stopScroll.bind(this));
            this.scrollbar.onDown.add(this.startScroll.bind(this));
            this.addChild(this.scrollbar);
            this.onScrollBound = this.onScroll.bind(this);
        }

        public enable():void{
            this.scrollbar.enable();
            if(this.upButton)this.upButton.enable();
            if(this.downButton)this.downButton.enable();
            if(this.bg)this.bg.interactive = true;
        }

        public disable():void{
            this.scrollbar.disable();
            if(this.upButton)this.upButton.disable();
            if(this.downButton)this.downButton.disable();
            if(this.bg)this.bg.interactive = false;
            this.stopScroll();
        }

        public get progress():number{
            return this._progress;
        }

        public set progress(value:number){            
            if(value<0){
                this._progress = 0;
            }else if(value>this.range){
                this._progress = this.range
            }else{
                this._progress = value;
            }
            this.placeBar();
        }

        protected placeBar():void{
            let pos:number = this._progress;
            if(this.useInts){
                pos = Math.round(pos * this.range) / this.range;
            }
            this.scrollbar.y = this.top + this.moveDist * pos;
        }

        private startScroll(target:Button, e:InteractionEvent):void{
            if(!this.scrolling){
                PIXI.ticker.shared.add(this.onScrollBound);
                this.scrolling = true;
                this.scrollStartY = e.data.global.y;
            }
        }

        private stopScroll():void{
            if(this.scrolling){
                PIXI.ticker.shared.remove(this.onScrollBound);
                this.scrolling = false;
            }
        }

        private onScroll():void{

        }

        private onStep(target:Button):void{

        }

        public setDimensions(width:number, height:number):void{
            if(this.bg){
                this.bg.width = width;
                this.bg.height = height;
            }
        }
    }
}