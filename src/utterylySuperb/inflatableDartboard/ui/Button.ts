///<reference path="text\TextField.ts"/>
///<reference path="..\..\..\..\node_modules\@types\signals\index.d.ts"/>
namespace utterlySuperb.inflatableDartboard.ui{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Text = PIXI.Text;
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.interfaces.ButtonConfigOptions;
    import InteractionEvent = PIXI.interaction.InteractionEvent;

    export class Button extends Container{

        public onUp:Signal;
        public onDown:Signal;
        public onOver:Signal;
        public onOut:Signal;
        protected config:ButtonConfigOptions;
        protected graphicHolder:Container;
        protected clickArea:Container;
        protected textField:TextField;
        private _selected:boolean;
        private _enabled:boolean;

        constructor(options:ButtonConfigOptions, copy:string=""){
            super();
            this.graphicHolder = new Container();
            this.addChild(this.graphicHolder);
            if(options.upTextStyle){
                let textWidth:number = options.upGraphic.width;
                let textHeight:number = options.upGraphic.height;
                let textAlign:string = "c";
                if(options.width)textWidth = options.width;
                if(options.height)textHeight = options.height;
                if(options.align)textAlign = options.align;
                this.textField = new TextField(textWidth, textHeight, textAlign, options.upTextStyle, copy);
                this.addChild(this.textField);
            }
            if(options.hitAreaGraphic){
                this.clickArea = options.hitAreaGraphic;
                this.addChild(this.clickArea);
            }else{
                this.clickArea = this.graphicHolder;
            }
            this.clickArea.on('pointerdown', this.onButtonDown.bind(this));
            this.clickArea.on('pointerup', this.onButtonUp)
            this.clickArea.on('pointerupoutside', this.onButtonUp)
            this.clickArea.on('pointerover', this.onButtonOver.bind(this))
            this.clickArea.on('pointerout', this.onButtonOut.bind(this));

            this.onUp = new Signal();
        }

        public enable():void{
            this.clickArea.interactive = true;
            this._enabled = true;
            this.displayUp();
        }

        public disable(showDisable:boolean = true):void{
            this.clickArea.interactive = false;
            if(showDisable){
                this.displayDisabled();
            }
        }

        public setText(newText:string):void{
            if(this.textField){
                this.textField.text = newText;
            }
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
            this.displayOver();
            this.onOver.dispatch(this);
        }        

        private onButtonOut(e:InteractionEvent):void{
            this.displayUp();
            this.onOut.dispatch(this);
        }

        protected displayUp():void{
            if(this.selected){
                this.displaySelected();
            }else{
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.upGraphic);
                if(this.textField && this.config.upTextStyle){
                    this.textField.setStyle(this.config.upTextStyle);
                }
            }
        }

        protected displayOver():void{
            if(this.selected && this.config.selectedOverGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.selectedOverGraphic);
            }else if(this.config.overGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.overGraphic);
            }
            if(this.textField && this.config.overTextStyle){
                this.textField.setStyle(this.config.overTextStyle);
            }
        }

        protected displayDown():void{
            if(this.selected && this.config.selectedDownGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.selectedDownGraphic);
            }else if(this.config.downGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.downGraphic);
            }
            if(this.textField && this.config.downTextStyle){
                this.textField.setStyle(this.config.downTextStyle);
            }
        }

        protected displayDisabled():void{
            if(this.selected && this.config.selectedDisableGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.selectedDisableGraphic);
            }else if(this.config.disableGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.disableGraphic);
            }
            if(this.textField && this.config.disableTextStyle){
                this.textField.setStyle(this.config.disableTextStyle);
            }
        }

        protected displaySelected():void{
            if(this.config.selectedGraphic){
                this.graphicHolder.removeChildren();
                this.graphicHolder.addChild(this.config.selectedGraphic);
            }
            if(this.textField && this.config.selectedTextStyle){
                this.textField.setStyle(this.config.selectedTextStyle);
            }
        }
    }
}