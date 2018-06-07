namespace utterlySuperb.inflatableDartboard.ui.text{
    import TextStyleOptions = PIXI.TextStyleOptions;
    export class TextHelperz{
        private static _instance:TextHelperz;
        private options:_.Dictionary<TextStyleOptions> = {};

        public static getInstance():TextHelperz{
            if(!TextHelperz._instance)TextHelperz._instance = new TextHelperz()
            return TextHelperz._instance;
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