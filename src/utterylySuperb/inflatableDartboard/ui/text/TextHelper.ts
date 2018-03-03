namespace utterlySuperb.inflatableDartboard.ui.text{
    import TextStyleOptions = PIXI.TextStyleOptions;
    export class TextHelper{
        private static _instance:TextHelper;
        private options:_.Dictionary<TextStyleOptions> = {};

        public static getInstance():TextHelper{
            if(!TextHelper._instance)TextHelper._instance = new TextHelper()
            return TextHelper._instance;
        }

        public getTextOptions(optionId:string):TextStyleOptions{
            if(this.options[optionId]){
                return _.cloneDeep(this.options[optionId]);
            }
            return {};
        }

        public addTextOption(optionId:string, option:TextStyleOptions):void{
            this.options[optionId] = option;
        }

        public addTextObject(textObject:any):void{
            this.options[textObject.id] = textObject;
        }
    }
}