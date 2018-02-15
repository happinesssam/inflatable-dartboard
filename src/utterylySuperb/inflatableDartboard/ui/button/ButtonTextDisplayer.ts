namespace utterlySuperb.inflatableDartboard.ui.button{
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    import TextStyle = PIXI.TextStyle;
    import TextStyleOptions = PIXI.TextStyleOptions;
    export class ButtonTextDisplayer implements IButtonDisplay{
        protected textField:TextField;
        protected upTextStyle:TextStyle;
        protected overTextStyle:TextStyle;
        protected downTextStyle:TextStyle;
        protected disableTextStyle:TextStyle;
        protected selectedTextStyle:TextStyle;
        private textStyles:TextStyle[];
        protected displayerOptions:ButtonDisplayOptions;

        public static DISPLAY_ID:string = "utterlySuperb.inflatableDartboard.ui.button.ButtonTextDisplayer";

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this.makeStyles(displayerOptions as ButtonOptionsBasicText);
            this.makeText(button, displayerOptions as ButtonOptionsBasicText);
            this.displayerOptions = displayerOptions;
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
          
            let textWidth:number = button.config.width;
            let textHeight:number = button.config.height;
            let textAlign:string = "c";
            if(!_.isNaN(displayerOptions.width))textWidth = displayerOptions.width;
            if(!_.isNaN(displayerOptions.height))textHeight = displayerOptions.height;
            if(displayerOptions.align)textAlign = button.config.align;
            this.textField = new TextField(textWidth, textHeight, textAlign, 
                this.upTextStyle, "");
            button.textHolder.addChild(this.textField);
            if(!_.isNaN(displayerOptions.offsetX)){
                this.textField.x = displayerOptions.offsetX;
            }
            if(!_.isNaN(displayerOptions.offsetY)){
                this.textField.y = displayerOptions.offsetY;
            }
        }

        protected getStyle(textOptions:TextStyleOptions):TextStyle{
            if(textOptions){
                let textStyle:TextStyle = new TextStyle(textOptions);
                this.textStyles.push(textStyle);
                return textStyle;
            }
            return null;
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
        }

        protected displayOver(button:Button):void{
            if(this.overTextStyle){
                this.textField.setStyle(this.overTextStyle);
            }
        }
        protected displayDown(button:Button):void{
            if(this.downTextStyle){
                this.textField.setStyle(this.downTextStyle);
            }
        }
        protected displayDisabled(button:Button):void{
            if(this.disableTextStyle){
                this.textField.setStyle(this.disableTextStyle);
            }
        }
        protected displaySelected(button:Button):void{
            if(this.selectedTextStyle){
                this.textField.setStyle(this.selectedTextStyle);
            }
        }
        public  setText(newText:string, button:Button, displayId?:string):void{
            if(displayId && this.displayerOptions.displayer!=displayId){
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