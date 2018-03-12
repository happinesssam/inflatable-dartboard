namespace utterlySuperb.inflatableDartboard.ui.button{
    import Container = PIXI.Container;
    import Point = PIXI.Point;
    export class AbstractButtonDisplayer implements IButtonDisplay{
        protected _displayerOptions:ButtonDisplayOptions;
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
        }

        public setButtonDimensions(width:number, height:number):void{
        }

        public setDisplayerDimensions(width:number, height:number):void{
        }

        public setState(state:ButtonState):void{
        }

        public  setText(newText:string, displayId?:string):void{
        }

        protected placeItemByAlign(item:Container, width:number, height:number):void{
            let align:string = this._displayerOptions.align || "c";
            switch(align.charAt(0)){
                case "t":
                item.y = 0;
                break;
                case "b":
                item.y = height - item.height - 5;
                break;
                default:
                item.y = (height - item.height)/2;
                break;
            }
            if(align.length==2){
                switch(align.charAt(1)){
                    case "l":
                    item.x = 0;
                    break;
                    case "r":
                    item.x = width - item.width;
                    break;
                    default:
                    item.x = (width - item.width)/2;
                    break;
                }
            }else{
                item.x = (width - item.width)/2;
            }
            if(this._displayerOptions.offsetX)item.x+=this._displayerOptions.offsetX;
            if(this._displayerOptions.offsetY)item.y+=this._displayerOptions.offsetY;

            let offset:OffsetInfo = _.find(this.offsets, {obj:item});
            if(offset){
                item.x+=offset.offset.x;
                item.y+=offset.offset.y;
            }
        }

        public cleanUp():void{
            this._button = null;
        }
    }
    export interface OffsetInfo{
        offset:Point;
        obj:any;
    }
}