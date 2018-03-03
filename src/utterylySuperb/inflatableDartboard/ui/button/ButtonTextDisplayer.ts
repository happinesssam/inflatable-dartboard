namespace utterlySuperb.inflatableDartboard.ui.button{
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import TextHelper = utterlySuperb.inflatableDartboard.ui.text.TextHelper;
    import TextStyle = PIXI.TextStyle;
    import TextStyleOptions = PIXI.TextStyleOptions;
    export class ButtonTextDisplayer implements IButtonDisplay{
        protected textField:TextField;
        protected upTextStyle:TextStyle;
        protected overTextStyle:TextStyle;
        protected downTextStyle:TextStyle;
        protected disableTextStyle:TextStyle;
        protected selectedTextStyle:TextStyle;
        protected textStyles:TextStyle[];
        protected maxWidth:number;
        protected maxHeight:number
        protected displayerOptions:ButtonOptionsBasicText;

        public static DISPLAY_ID:string = "TextDisplayer";

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this.displayerOptions = displayerOptions as ButtonOptionsBasicText;
            if(this.displayerOptions.width){
                this.maxWidth = this.displayerOptions.width;
            }else{
                this.maxWidth = button.config.width;
            }
            if(this.displayerOptions.height){
                this.maxHeight = this.displayerOptions.height;
            }else{
                this.maxHeight = button.config.height;
            }
            this.makeStyles(this.displayerOptions);
            this.makeText(button, this.displayerOptions);            
        }

        protected makeStyles(displayerOptions:ButtonOptionsBasicText):void{
            this.textStyles = [];
            this.upTextStyle = this.getStyle(displayerOptions.upTextStyle);
            this.overTextStyle = this.getStyle(displayerOptions.overTextStyle);
            this.downTextStyle = this.getStyle(displayerOptions.downTextStyle);
            this.disableTextStyle = this.getStyle(displayerOptions.disableTextStyle);
            this.selectedTextStyle = this.getStyle(displayerOptions.selectedTextStyle);
        }
    
        protected makeText(button:Button, displayerOptions:ButtonOptionsBasicText):void{

            let textAlign:string = "c";
            if(displayerOptions.align)textAlign = button.config.align;
            this.textField = new TextField(this.maxWidth, this.maxHeight, "c", this.upTextStyle, "hello");
            button.textHolder.addChild(this.textField);
            this.placeText();
            button.textHolder.addChild(this.textField);
        }

        protected getStyle(textOptions:TextStyleOptions | string):TextStyle{
            if(textOptions){
                if(typeof textOptions=="string"){
                    textOptions = TextHelper.getInstance().getTextOptions(textOptions);
                    if(this.displayerOptions.multiline){
                        textOptions.wordWrap = true;
                        textOptions.wordWrapWidth = this.maxWidth;
                    }
                }
                let textStyle:TextStyle = new TextStyle(textOptions);
                this.textStyles.push(textStyle);
                return textStyle;
            }
            return null;
        }

        protected placeText(isDown:boolean = false):void{
            if(!_.isNaN(this.displayerOptions.offsetX) && !_.isUndefined(this.displayerOptions.offsetX)){
                this.textField.x = this.displayerOptions.offsetX;
            }else{
                this.textField.x = 0;
            }
            if(!_.isNaN(this.displayerOptions.offsetY) && !_.isUndefined(this.displayerOptions.offsetY)){
                this.textField.y = this.displayerOptions.offsetY;
            }else{
                this.textField.y = 0;
            }
            if(this.displayerOptions.downOffset && isDown){
                this.textField.x+=this.displayerOptions.downOffset.x;
                this.textField.y+=this.displayerOptions.downOffset.y;
            }
        }

        public setState(button:Button, state:ButtonState):void{
            switch(state){
                case ButtonState.up:
                this.displayUp(button);
                break;
                case ButtonState.over:
                this.displayOver(button);
                break;
                case ButtonState.down:
                this.displayDown(button);
                break;
                case ButtonState.selected:
                this.displaySelected(button);
                break;
                case ButtonState.disabled:
                this.displayDisabled(button);
                break;
                case ButtonState.selectedOver:
                this.displaySelected(button);
                break;
                case ButtonState.selectedDown:
                this.displaySelected(button);
                break;
            }
        }

        protected displayUp(button:Button):void{
            this.textField.setStyle(this.upTextStyle);
            this.placeText();
        }

        protected displayOver(button:Button):void{
            if(this.overTextStyle){
                this.textField.setStyle(this.overTextStyle);               
            }
            this.placeText();
        }
        protected displayDown(button:Button):void{
            if(this.downTextStyle){
                this.textField.setStyle(this.downTextStyle);               
            }
            this.placeText(true);
        }
        protected displayDisabled(button:Button):void{
            if(this.disableTextStyle){
                this.textField.setStyle(this.disableTextStyle);                
            }
            this.placeText();
        }
        protected displaySelected(button:Button):void{
            if(this.selectedTextStyle){
                this.textField.setStyle(this.selectedTextStyle);               
            }
            this.placeText();
        }
        public  setText(newText:string, button:Button, displayId?:string):void{
            if(displayId && this.displayerOptions.class!=displayId){
                return;
            }
            this.textField.text = newText;
            _.forEach(this.textStyles, (textStyle:TextStyle)=>{
                if(textStyle!=this.textField.textStyle){
                    textStyle.fontSize = this.textField.textStyle.fontSize;
                }
            });
        }
    }
}