namespace utterlySuperb.inflatableDartboard.ui.button{
    export class ButtonHelperz{
        private static _instance:ButtonHelperz;

        private buttonDefs:_.Dictionary<ButtonConfigOptions> = {};
        private displayerDefs:_.Dictionary<ButtonDisplayOptions> = {};

        public static getInstance():ButtonHelperz{
            if(!ButtonHelperz._instance)ButtonHelperz._instance = new ButtonHelperz();
            return ButtonHelperz._instance;
        }

        public addButtonObject(buttonOb:any):void{
            this.buttonDefs[buttonOb.id] = buttonOb;
        }

        public addDisplayerObject(displayerOb:any):void{
            this.displayerDefs[displayerOb.id] = displayerOb;
        }

        public getDisplayer(displayerId:string):ButtonDisplayOptions{
            if(this.displayerDefs[displayerId]){
                return this.displayerDefs[displayerId];
            }
            return null;
        }

        public getButton(buttonId:string, copy?:string):Button{
            if(this.buttonDefs[buttonId]){
                return new Button(this.buttonDefs[buttonId], copy);//should I clonedeep the config?
            }
            return null;
        }
    }
}