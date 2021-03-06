///<reference path="..\text\TextField.ts"/>
///<reference path="..\text\TextHelper.ts"/>
///<reference path="..\..\utils\FunctionUtils.ts"/>
///<reference path="..\..\app\utils\TextureHelper.ts"/>
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
        public onClick:Signal = new Signal();
        public onDown:Signal = new Signal();
        public onOver:Signal = new Signal();
        public onOut:Signal = new Signal();

        
        protected hitAreaGraphic?:PIXI.Sprite;
        protected displayers:IButtonDisplay[];

        public config:ButtonConfigOptions;
        public graphicHolder:Container;
        public textHolder:Container;
        public currentState:ButtonState = ButtonState.up;
        protected clickArea:Container;
        public textField:TextField;
        private _selected:boolean;
        private _enabled:boolean;
        protected mouseIsOver:boolean;
        private _buttonWidth:number = 100;
        private _buttonHeight:number = 100;
        private pressStart:number;
        public clickTime:number = -1;
        public static NUM_STATES:number = 7;//+all

        constructor(config:ButtonConfigOptions, copy:string=""){
            super();
            this.config = config;

            this.graphicHolder = new Container();
            this.addChild(this.graphicHolder);

            this.textHolder = new Container();
            this.addChild(this.textHolder);

            if(config.width)this._buttonWidth = config.width;
            if(config.height)this._buttonHeight = config.height;

            if(config.hitArea){
                this.hitAreaGraphic = Sprite.from(TextureHelper.getInstance().getAssetURl(config.hitArea));
                this.hitAreaGraphic.width = this._buttonWidth;
                this.hitAreaGraphic.height = this._buttonHeight;
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
                    let displayerConfig:ButtonDisplayOptions = UIHelper.getInstance().getDisplayer(displayerId);

                    switch(displayerConfig.class){
                        case ButtonTextDisplayer.DISPLAY_ID:
                        classOb = ButtonTextDisplayer;
                        break;
                        case ButtonGraphicSwapper.DISPLAY_ID:
                        classOb = ButtonGraphicSwapper;
                        break;
                        case ButtonIconDisplayer.DISPLAY_ID:
                        classOb = ButtonIconDisplayer;
                        break;
                        default:
                        classOb = FunctionUtils.stringToFunction(displayerConfig.class);
                    }
                    
 
                    let displayer:IButtonDisplay = new classOb(this) as IButtonDisplay;
                    displayer.init(this, displayerConfig);
                    displayer.setText(copy);
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
            this.mouseIsOver = false;
            this._enabled = false;
            if(showDisable){
                this.displayDisabled();
            }else{
                this.displayUp();
            }
            
        }

        public get enabled():boolean{
            return this._enabled;
        }

        public setText(newText:string, displayId?:string):void{
            _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                displayer.setText(newText, displayId);
            });
        }
//TODO make it so now 'displayX', just applies currentState
        public set selected(value:boolean){
            if(value!=this._selected){
                this._selected = value;

                if(this._enabled){                    
                    if(this.mouseIsOver){
                        this.displayOver();
                    }else{
                        this.displayUp();
                    }
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
            this._buttonWidth = width;
            this._buttonHeight = height;
            this.onDimensionChange();
        }

        public set buttonWidth(value:number){
            if(value!=this._buttonWidth){
                this._buttonWidth = value;
                if(this.clickArea!=this){
                    this.clickArea.width = value;
                }
                this.onDimensionChange();
            }
        }
        public get buttonWidth():number{return this._buttonWidth;}

        public set buttonHeight(value:number){
            if(value!=this._buttonHeight){
                this._buttonHeight = value;
                if(this.clickArea!=this){
                    this.clickArea.height = value;
                }
                this.onDimensionChange();
            }
        }
        public get buttonHeight():number{return this._buttonHeight;}

        private onDimensionChange():void{
            _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                displayer.buttonDimensionChange();
            })
        }

        public get selected():boolean{
            return this._selected;
        }

        public getDisplayer(id:string):IButtonDisplay{
            return _.find(this.displayers, {id:id});
        }

        public getDisplayerByType(type:string):IButtonDisplay{
            return _.find(this.displayers, {type:type});
        }

        private onButtonDown(e:InteractionEvent):void{
            this.displayDown();
            this.onDown.dispatch(this, e);
            this.pressStart = Date.now();
        }        

        private onButtonUp(e:InteractionEvent):void{
            this.displayUp();          
            this.onUp.dispatch(this, e);
            if(this.clickTime<0 || Date.now()-this.pressStart<this.clickTime){
                this.onClick.dispatch(this, e);
            }
        }

        private onButtonOver(e:InteractionEvent):void{
            this.mouseIsOver = true;
            this.displayOver();
            this.onOver.dispatch(this, e);
        }        

        private onButtonOut(e:InteractionEvent):void{
            this.mouseIsOver = false;
            this.displayUp();
            this.onOut.dispatch(this, e);
        }

        protected displayUp():void{
            if(this.mouseIsOver){
                this.displayOver();
            }
            else if(this.selected){
                this.currentState=ButtonState.selected;
                this.setDisplayerState();
            }else{
                this.currentState=ButtonState.up;
                this.setDisplayerState();
            }
        }

        protected displayOver():void{
            if(this.selected){
                this.currentState = ButtonState.selectedOver;
            }else{
                this.currentState = ButtonState.over;
            }
            this.setDisplayerState();
        }

        protected displayDown():void{
            if(this.selected){
                this.currentState = ButtonState.selectedDown;
            }else{
                this.currentState = ButtonState.down;
            }
            this.setDisplayerState();
        }

        protected displayDisabled():void{
            this.currentState=this.selected ? ButtonState.selectedDisabled : ButtonState.disabled;
            this.setDisplayerState();
        }

        protected displaySelected():void{
            if(this.mouseIsOver){
                this.currentState=ButtonState.selectedOver;
            }else{
                this.currentState=ButtonState.selected;
            }     
            this.setDisplayerState();       
        }

        protected setDisplayerState():void{
            _.forEach(this.displayers, (displayer:IButtonDisplay)=>{
                displayer.setState(this.currentState);
            });
        }
    }
    export enum ButtonState{
        up,
        over,
        down,
        disabled,
        selected,
        selectedOver,
        selectedDown,
        selectedDisabled,
        all
    }
}