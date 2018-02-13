namespace utterlySuperb.inflatableDartboard.ui.button{
    import TextField = utterlySuperb.inflatableDartboard.ui.text.TextField;
    export class ButtonTextDisplayer implements IButtonDisplay{
        protected textField:TextField;

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this.makeText(button, displayerOptions as ButtonOptionsBasicText);
        }
    
        protected makeText(button:Button, displayerOptions:ButtonOptionsBasicText):void{
            if(displayerOptions.upTextStyle){
                let textWidth:number = button.config.width;
                let textHeight:number = button.config.height;
                let textAlign:string = "c";
                if(!_.isNaN(displayerOptions.width))textWidth = displayerOptions.width;
                if(!_.isNaN(displayerOptions.height))textHeight = displayerOptions.height;
                if(displayerOptions.align)textAlign = button.config.align;
                this.textField = new TextField(textWidth, textHeight, textAlign, 
                    displayerOptions.upTextStyle, "");
                button.textHolder.addChild(this.textField);
                if(!_.isNaN(displayerOptions.offsetX)){
                    this.textField.x = displayerOptions.offsetX;
                }
                if(!_.isNaN(displayerOptions.offsetY)){
                    this.textField.y = displayerOptions.offsetY;
                }
            }
        }
//TODO, make individual text styles so I can change them
        public  displayUp(button:Button):void{
            if(button.textField && button.config.upTextStyle){
                this.textField.setStyle(button.config.upTextStyle);
            }
        }

        public  displayOver(button:Button):void{
            if(button.textField && button.config.overTextStyle){
                button.textField.setStyle(button.config.overTextStyle);
            }
        }
        public  displayDown(button:Button):void{
            if(button.textField && button.config.downTextStyle){
                button.textField.setStyle(button.config.downTextStyle);
            }
        }
        public  displayDisabled(button:Button):void{
            if(button.textField && button.config.disableTextStyle){
                button.textField.setStyle(button.config.disableTextStyle);
            }
        }
        public  displaySelected(button:Button):void{
            if(button.textField && button.config.selectedTextStyle){
                button.textField.setStyle(button.config.selectedTextStyle);
            }
        }
        public  setText(newText:string, button:Button):void{
            if(button.textField){
                button.textField.text = newText;
            }
        }
    }
}