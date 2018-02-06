namespace utterlySuperb.pixiApp.ui{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Text = PIXI.Text;
    import TextField = utterlySuperb.pixiApp.ui.text.TextField;
    import ButtonConfigOptions = utterlySuperb.pixiApp.ui.interfaces.ButtonConfigOptions;
    export class Button extends Container{

        protected config:ButtonConfigOptions;
        protected graphicHolder:Container;
        protected clickArea:Container;
        protected textField:TextField;
        private _selected:boolean;

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
            .on('pointerdown', onButtonDown)
            .on('pointerup', onButtonUp)
            .on('pointerupoutside', onButtonUp)
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);
        }

        public enable():void{

        }

        public disable(showDisable:boolean = true):void{

        }

        public setText(newText:string):void{

        }

        protected placeText():void{

        }

        public set selected(value:boolean){
            if(value!=this._selected){
                this._selected = value;
            }
        }

        public get selected():boolean{
            return this._selected;
        }

        private onButtonDown(e:InteractionEvent):void{

        }

        protected displayUp():void{

        }

        protected displayOver():void{

        }

        protected displayDown():void{

        }

        protected displayDisabled():void{

        }

        protected displaySelected():void{

        }
    }
}