///<reference path="..\ui\button\Button.ts"/>
namespace utterlySuperb.inflatableDartboard.ui{
    import TextStyleOptions = PIXI.TextStyleOptions;
    import ButtonConfigOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonConfigOptions;
    import ButtonDisplayOptions = utterlySuperb.inflatableDartboard.ui.button.ButtonDisplayOptions;
    import Button = utterlySuperb.inflatableDartboard.ui.button.Button;
    import WidgetDef = utterlySuperb.inflatableDartboard.ui.widgets.WidgetDef;
    import Logs = utterlySuperb.inflatableDartboard.app.utils.Logs;
    export class UIHelper{
        private static _instance:UIHelper;
        private textStyleOptions:_.Dictionary<TextStyleOptions> = {};
        private buttonDefs:_.Dictionary<ButtonConfigOptions> = {};
        private displayerDefs:_.Dictionary<ButtonDisplayOptions> = {};
        private widgetDefs:_.Dictionary<WidgetDef> = {};
        private miscDefs:_.Dictionary<any> = {};//for other stuff there may be one of
        //TODO add some error checking so I can't add garbage obs

        public static getInstance():UIHelper{
            if(!UIHelper._instance)UIHelper._instance = new UIHelper()
            return UIHelper._instance;
        }

        /**
         * Text stuff
         */

        public getTextOptions(optionId:string):TextStyleOptions{
            if(this.textStyleOptions[optionId]){
                return _.cloneDeep(this.textStyleOptions[optionId]);
            }
            return {};
        }

        public addTextOption(optionId:string, option:TextStyleOptions):void{
            this.textStyleOptions[optionId] = option;
        }

        public addTextObject(textObject:any):void{
            this.textStyleOptions[textObject.id] = textObject;
        }

        /**
         * Button stuff
         */
        public addButtonObject(buttonOb:any):void{
            if(this.displayerDefs[buttonOb.id]){
                Logs.error("Button "+ buttonOb.id +" has already been assigned");
                return;
            }
            this.buttonDefs[buttonOb.id] = buttonOb;
        }

        public addDisplayerObject(displayerOb:any):void{
            if(this.displayerDefs[displayerOb.id]){
                Logs.error("Displayer "+ displayerOb.id +" has already been assigned");
                return;
            }
            this.displayerDefs[displayerOb.id] = displayerOb;
        }

        public getDisplayer(displayerId:string):ButtonDisplayOptions{
            if(this.displayerDefs[displayerId]){
                return this.displayerDefs[displayerId];
            }
            Logs.error("Displayer "+ displayerId +" does not exist");
            return null;
        }

        public getButton(buttonId:string, copy?:string):Button{
            if(this.buttonDefs[buttonId]){
                return new Button(this.buttonDefs[buttonId], copy);//should I clonedeep the config?
            }
            Logs.error("Button "+ buttonId +" does not exist");
            return null;
        }

        public addMiscOb(miscOb:any):void{
            if(this.miscDefs[miscOb.id]){
                Logs.error("Misc "+ miscOb.id +" has already been assigned");
                return;
            }
            this.miscDefs[miscOb.id] = miscOb;
        }

        public getMiscOb(obId:string):any{
            if(!this.miscDefs[obId]){
                Logs.error("Misc "+ obId +" does not exist");
                return null;
            }
            return this.miscDefs[obId];
        }
    }
}