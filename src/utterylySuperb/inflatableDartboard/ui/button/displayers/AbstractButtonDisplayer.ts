namespace utterlySuperb.inflatableDartboard.ui.button{
    import Container = PIXI.Container;
    import Point = PIXI.Point;
    import IPoint = utterlySuperb.inflatableDartboard.ui.interfaces.IPoint;
    export class AbstractButtonDisplayer implements IButtonDisplay{
        protected _displayerOptions:ButtonDisplayOptions;
        protected states:StateInfo[] = [];
        protected statesPosition:Point = new Point();
        protected defaultState:StateInfo;
        private _button:Button;
        protected offsets:OffsetInfo[] = [];
        

        public get button():Button
        {
            return this._button;
        }

        public get id():string
        {
            return this._displayerOptions.id;
        }

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this._button = button;
            this._displayerOptions = displayerOptions;  
            _.times(Button.NUM_STATES, (state:ButtonState)=>{
                this.createState(state);
            });
        }

        public buttonDimensionChange():void{
        }

        public setDisplayerDimensions(width:number, height:number):void{
        }

        public setState(state:ButtonState):void{
        }

        protected createState(state:ButtonState):void{
        }

        protected getStateInfo(state:ButtonState):StateInfo{
            let info:StateInfo = _.find(this.states, {state:state});
            return info || this.defaultState;
        }

        public  setText(newText:string, displayId?:string):void{
        }

        protected applyState(stateInfo:StateInfo):void{
            
        }

        protected placeItemByAlign(item:IPoint, width:number, height:number):void{
            let align:string = this._displayerOptions.align || "c";
            switch(align.charAt(0)){
                case "t":
                item.y = 0;
                break;
                case "b":
                item.y = height - this.button.height - 5;
                break;
                default:
                item.y = (height - this.button.height)/2;
                break;
            }
            if(align.length==2){
                switch(align.charAt(1)){
                    case "l":
                    item.x = 0;
                    break;
                    case "r":
                    item.x = width - this.button.width;
                    break;
                    default:
                    item.x = (width - this.button.width)/2;
                    break;
                }
            }else{
                item.x = (width - this.button.width)/2;
            }
            if(this._displayerOptions.offsetX)item.x+=this._displayerOptions.offsetX;
            if(this._displayerOptions.offsetY)item.y+=this._displayerOptions.offsetY;
        }

        public cleanUp():void{
            this._button = null;
        }
    }
    export interface OffsetInfo{
        offset:Point;
        obj:any;
    }
    export class StateInfo{
        private static zeroPoint:Point = new Point();
        public offset:Point;
        public state:ButtonState;
        public obj:any;

        constructor(state:ButtonState){
            this.state = state;
            this.offset = StateInfo.zeroPoint;
        }
    }
}