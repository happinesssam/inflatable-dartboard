///<reference path="..\text\TextField.ts"/>
///<reference path="..\text\TextHelper.ts"/>
///<reference path="..\..\utils\FunctionUtils.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.button{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Texture = PIXI.Texture;
    import Text = PIXI.Text;
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonConfigOptions;
    import InteractionEvent = PIXI.interaction.InteractionEvent;
    import FunctionUtils = utterlySuperb.inflatableDarboard.utils.FunctionUtils;
    import TextureHelper = utterlySuperb.inflatableDartboard.app.utils.TextureHelper;

    export class Button extends Container{

        public onUp:Signal = new Signal();
        public onDown:Signal = new Signal();
        public onOver:Signal = new Signal();
        public onOut:Signal = new Signal();

        
        protected hitAreaGraphic?:PIXI.Sprite;
        protected displayers:IButtonDisplay[];

        public config:ButtonConfigOptions;
        public graphicHolder:Container;
        public textHolder:Container;
        protected clickArea:Container;
        public textField:TextField;
        private _selected:boolean;
        private _enabled:boolean;
        protected mouseIsOver:boolean;

        constructor(config:ButtonConfigOptions, copy:string=""){
            super();
            this.config = config;

            this.graphicHolder = new Container();
            this.addChild(this.graphicHolder);

            this.textHolder = new Container();
            this.addChild(this.textHolder);

            if(config.hitArea){
                this.hitAreaGraphic = Sprite.from(TextureHelper.getInstance().getAssetURl(config.hitArea));
                if(config.width)this.hitAreaGraphic.width = config.width;
                if(config.height)this.hitAreaGraphic.height = config.height;
                this.clickArea = this.hitAreaGraphic;
                this.addChild(this.clickArea);
                this.clickArea.alpha = 0;
            }else{
                this.clickArea = this;
            }

            this.clickArea.on('pointerdown', this.onButtonDown.bind(this));
            this.clickArea.on('pointerup', this.onButtonUp.bind(this))
            this.clickArea.on('pointerupoutside', this.onButtonUp.bind(this))
            this.clickArea.on('pointerover', this.onButtonOver.bind(this))
            this.clickArea.on('pointerout', this.onButtonOut.bind(this));

            this.displayers = [];

            if(config.displayers){
                _.forEach(config.displayers, (displayerId:string)=>{
                    let classOb:any;
                    let displayerConfig:ButtonDisplayOptions = ButtonHelper.getInstance().getDisplayer(displayerId);

                    switch(displayerConfig.class){
                        case ButtonTextDisplayer.DISPLAY_ID:
                        classOb = ButtonTextDisplayer;
                        break;
                        case ButtonGraphicSwapper.DISPLAY_ID:
                        classOb = ButtonGraphicSwapper;
                        break;
                        default:
                        classOb = FunctionUtils.stringToFunction(displayerConfig.class);
                    }
                    
 
                    let displayer:IButtonDisplay = new classOb(this) as IButtonDisplay;
                    displayer.init(this, displayerConfig);
                    displayer.setText(copy, this);
                    this.displayers.push(displayer);
                });
            }
            if(copy){
                this.setText(copy);
            }
        }        

        public enable():void{
            this.clickArea.buttonMode = this.clickArea.interactive = true;           
            this._enabled = true;
            this.displayUp();
        }

        public disable(showDisable:boolean = true):void{
            this.clickArea.buttonMode = this.clickArea.interactive = false;
            if(showDisable){
                this.displayDisabled();
            }
            this.mouseIsOver = false;
        }

        public get enabled():boolean{
            return this._enabled;
        }

        public setText(newText:string, displayId?:string):void{
            _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                displayer.setText(newText, this, displayId);
            });
        }

        public set selected(value:boolean){
            if(value!=this._selected){
                this._selected = value;
                if(this._enabled){
                    this.displayUp();
                }else{
                    this.displayDisabled();
                }
            }
        }

        public setDimensions(width:number, height:number):void{
            if(this.clickArea != this){
                this.clickArea.width = width;
                this.clickArea.height = height;
            }
        }

        public get selected():boolean{
            return this._selected;
        }

        private onButtonDown(e:InteractionEvent):void{
            this.displayDown();
            this.onDown.dispatch(this);
        }        

        private onButtonUp(e:InteractionEvent):void{
            this.displayUp();
            this.onUp.dispatch(this);
        }

        private onButtonOver(e:InteractionEvent):void{
            this.mouseIsOver = true;
            this.displayOver();
            this.onOver.dispatch(this);
        }        

        private onButtonOut(e:InteractionEvent):void{
            this.mouseIsOver = false;
            this.displayUp();
            this.onOut.dispatch(this);
        }

        protected displayUp():void{
            if(this.mouseIsOver){
                this.displayOver();
            }
            else if(this.selected){
                this.displaySelected();
            }else{
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.up);
                });
            }
        }

        protected displayOver():void{
            if(this.selected){
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.selectedOver);
                });
            }else{
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.over);
                });
            }
        }

        protected displayDown():void{
            if(this.selected){
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.selectedDown);
                });
            }else{
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.down);
                });
            }
        }

        protected displayDisabled():void{
            _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                displayer.setState(this, ButtonState.disabled);
            });
        }

        protected displaySelected():void{
            if(this.mouseIsOver){
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.selectedOver);
                });
            }else{
                _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                    displayer.setState(this, ButtonState.selected);
                });
            }
            
        }
    }
    export enum ButtonState{
        up,
        over,
        down,
        disabled,
        selected,
        selectedOver,
        selectedDown
    }
}