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

        constructor(width:number, height:number, align:string="c", styleOptions:TextStyleOptions | TextStyle | string=null, copy:string=""){
            super();
            this.boxWidth = width;
            this.boxHeight = height;
            let style:TextStyle;
            if(typeof styleOptions=="string"){
                styleOptions = TextHelper.getInstance().getTextOptions(styleOptions);
                style = new TextStyle(styleOptions);
            }else if(styleOptions instanceof TextStyle){
                style = styleOptions;
            }else{
                style = new TextStyle(styleOptions);
            }
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

        public setDimensions(width:number, height:number):void{
            this.boxWidth = width;
            this.boxHeight = height;
            this.placeText();
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
                this.textField.y = this.boxHeight - this.textField.height - 5;
                break;
                default:
                this.textField.y = (this.boxHeight - this.textField.height - 5)/2;
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