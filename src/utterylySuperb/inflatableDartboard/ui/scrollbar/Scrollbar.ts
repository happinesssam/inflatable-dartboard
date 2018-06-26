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
    import PixiManager = utterlySuperb.inflatableDartboard.app.PixiManager;
    export class Scrollbar extends Container{
        private upButton:Button;
        private downButton:Button;
        private scrollbar:Button;
        private bg:Container;
        private _enable:boolean;
        private _progress:number;
        private moveStep:number = 0.1;
        private moveDist:number;
        private top:number = 0;
        private useInts:boolean;
        private range:number = 1;
        private scrollStartY:number;
        private scrolling:boolean;
        private scrollbarRatio:number;
        private onScrollBound:()=>void;
        private _height:number;
        private options:ScrollbarConfig;

        public onChange:Signal = new Signal();

        constructor(options:ScrollbarConfig, height:number=100, scrollbarRatio:number=0.3, progress:number = 0){
            super();
            this.options = options;
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
            this.scrollbarRatio = scrollbarRatio;
            this.setDimensions(options.width, height);
            this.progress = progress;
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
                this.scrollStartY = 
                this.toLocal(PixiManager.getInstance().stageInteractionManager.mouse.global, this).y;
            }
        }

        private stopScroll():void{
            if(this.scrolling){
                PIXI.ticker.shared.remove(this.onScrollBound);
                this.scrolling = false;
            }
        }

        private onScroll():void{
            let newMouseY:number =  
            this.toLocal(PixiManager.getInstance().stageInteractionManager.mouse.global, this).y;
            this.scrollbar.y += newMouseY - this.scrollStartY;
            this.scrollStartY = newMouseY;
            this.scrollbar.y  = Math.max(this.top, Math.min(this.top + this.moveDist, this.scrollbar.y));
            this._progress = (this.scrollbar.y - this.top)/this.moveDist;
            this.onChange.dispatch(this, this._progress);
        }

        private onStep(target:Button):void{
            let step:number = this.moveStep;
            if(target==this.upButton){
                step*=-1;
            }
            this.progress+=step;
            this.onChange.dispatch(this, this._progress);
        }

        public setDimensions(width:number, height:number):void{
            if(this.bg){
                this.bg.width = width;
                this.bg.height = height;
            }
            this._height = height;
            this.setValues();
        }

        public setScrollbarRatio(scrollbarRatio:number):void{
            this.scrollbarRatio = scrollbarRatio;
            this.setValues();
        }

        private setValues():void{
            this.moveDist = this._height;
            this.top = 0;
            if(this.upButton){
                this.moveDist-=this.upButton.height;
                this.top = this.upButton.height;
            }
            if(this.downButton){
                this.moveDist-=this.downButton.height;
                this.downButton.y = this._height - this.downButton.height;
            }
            if(this.scrollbar){
                this.scrollbar.setDimensions(this.options.width, Math.floor(this.moveDist * this.scrollbarRatio));
                this.moveDist-=this.scrollbar.height;
            }
        }
    }
}