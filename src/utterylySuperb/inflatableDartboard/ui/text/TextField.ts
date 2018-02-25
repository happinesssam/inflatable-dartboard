namespace utterlySuperb.inflatableDartboard.ui.text{
    import Container = PIXI.Container;
    import TextStyle = PIXI.TextStyle;
    import TextStyleOptions = PIXI.TextStyleOptions;
    import Text = PIXI.Text;
    export class TextField extends Container{
        public textField:Text;
        private boxWidth:number;
        private boxHeight:number;
        private align:string;

        constructor(width:number, height:number, align:string="c", styleOptions:TextStyleOptions | string=null, copy:string=""){
            super();
            this.boxWidth = width;
            this.boxHeight = height;
            if(typeof styleOptions=="string"){
                styleOptions = TextHelper.getInstance().getTextOptions(styleOptions);
            }
            let style:TextStyle = new TextStyle(styleOptions);
            this.textField = new Text(copy, style);
            this.addChild(this.textField);
            this.align = align.toLowerCase();
            this.placeText();
        }

        public set text(value:string){
            this.textField.text = value;
            this.placeText();
        }

        public get text():string{
            return this.textField.text;
        }

        public setStyle(style:TextStyle):void{
            this.textField.style = style;
            this.placeText();
        }      
        
        public get textStyle():TextStyle{
            return this.textField.style;
        }

        public setStyleOptions(style:TextStyleOptions):void{
            this.textField.style = new TextStyle(style);
            this.placeText();
        }

        private placeText():void{
            switch(this.align.charAt(0)){
                case "t":
                this.textField.y = 0;
                break;
                case "b":
                this.textField.y = this.boxHeight - this.textField.height;
                break;
                default:
                this.textField.y = (this.boxHeight - this.textField.height)/2;
                break;
            }
            if(this.align.length==2){
                switch(this.align.charAt(1)){
                    case "l":
                    this.textField.x = 0;
                    break;
                    case "r":
                    this.textField.x = this.boxWidth - this.textField.width;
                    break;
                    default:
                    this.textField.x = (this.boxWidth - this.textField.width)/2;
                    break;
                }
            }else{
                this.textField.x = (this.boxWidth - this.textField.width)/2;
            }
        }
    }
}