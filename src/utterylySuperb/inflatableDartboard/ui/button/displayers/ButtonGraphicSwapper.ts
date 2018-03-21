///<reference path="..\..\..\app\utils\TextureHelper.ts"/>
///<reference path="AbstractButtonDisplayer.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.button{
    import Sprite = PIXI.Sprite;
    import Container = PIXI.Container;
    import Texture = PIXI.Texture;
    import TextureHelper = utterlySuperb.inflatableDartboard.app.utils.TextureHelper;
    import Point = PIXI.Point;
    export class ButtonGraphicSwapper extends AbstractButtonDisplayer{

        protected upGraphic:Container;
        protected overGraphic?:Container;
        protected downGraphic?:Container;
        protected disableGraphic?:Container;
        protected selectedGraphic?:Container;
        protected selectedOverGraphic?:Container;
        protected selectedDownGraphic?:Container;
        protected currentGraphic:Container;
        protected ignoreButtonSize:boolean;
        protected sprites:Container[] = [];
        
        

        //I guess there is a better way of doing this?
        public static DISPLAY_ID:string = "GraphicSwapper";

        protected get displayerOptions():ButtonDisplayOptionsGraphicsSwapper{
            return this._displayerOptions as ButtonDisplayOptionsGraphicsSwapper
        }

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            super.init(button, displayerOptions);
            this.ignoreButtonSize = (_.isNumber(displayerOptions.width) && _.isNumber(displayerOptions.height));
            if(this.ignoreButtonSize){
                this.setDisplayerDimensions(displayerOptions.width, displayerOptions.height);
            }else{
                this.buttonDimensionChange();
            }
        }

        protected createState(state:ButtonState):void{
            let info:StateInfo = new StateInfo(state);
            switch(state){
                case ButtonState.up:
                info.obj = this.createGraphic(this.displayerOptions.upGraphic);
                this.defaultState = info;
                break;
                case ButtonState.down:
                info.obj = this.createGraphic(this.displayerOptions.downGraphic);
                if(this.displayerOptions.downOffset)info.offset = this.displayerOptions.downOffset;
                break;
                case ButtonState.selectedDown:
                info.obj = this.createGraphic(this.displayerOptions.selectedDownGraphic || this.displayerOptions.downGraphic);
                if(this.displayerOptions.downOffset)info.offset = this.displayerOptions.downOffset;
                break;
                case ButtonState.over:
                info.obj = this.createGraphic(this.displayerOptions.overGraphic);
                if(this.displayerOptions.overOffset)info.offset = this.displayerOptions.overOffset;
                break;
                case ButtonState.selectedOver:
                info.obj = this.createGraphic(this.displayerOptions.selectedOverGraphic || this.displayerOptions.overGraphic);
                if(this.displayerOptions.overOffset)info.offset = this.displayerOptions.overOffset;
                break;
                case ButtonState.selected:
                info.obj = this.createGraphic(this.displayerOptions.selectedGraphic);
                if(this.displayerOptions.selectedOffset)info.offset = this.displayerOptions.selectedOffset;
                break;
                case ButtonState.disabled:
                info.obj = this.createGraphic(this.displayerOptions.disableGraphic);
                if(this.displayerOptions.disableOffset)info.offset = this.displayerOptions.disableOffset;
                break;
            }
            if(!info.obj && this.defaultState.obj)info.obj = this.defaultState.obj;
            this.states.push(info);
        }

        private createGraphic(texture:string):Container{
            let sprite:Container = null;
            if(texture){
                sprite = TextureHelper.getInstance().getAsset(texture);
                this.sprites.push(sprite);
            }
            return sprite;
        }

        protected applyState(stateInfo:StateInfo):void{
            console.log(stateInfo, this.statesPosition);
            stateInfo.obj.x = this.statesPosition.x + stateInfo.offset.x;
            stateInfo.obj.y = this.statesPosition.y + stateInfo.offset.y;
            this.switchGraphic(stateInfo.obj);
        }

        public buttonDimensionChange():void{
            if(!this.ignoreButtonSize && !this.displayerOptions.noResize){
                _.forEach(this.sprites, (graphic:Container)=>{
                    graphic.width = this.button.width;
                    graphic.height = this.button.height;
                });
            }    
            this.placeGraphics();        
        }

        public setDisplayerDimensions(width:number, height:number):void{
            if(this.ignoreButtonSize && !this.displayerOptions.noResize){
                _.forEach(this.sprites, (graphic:Container)=>{
                    graphic.width = width;
                    graphic.height = height;
                });
            }
            this.placeGraphics();
        }

        protected placeGraphics():void{
            this.placeItemByAlign(this.statesPosition, this.defaultState.obj.width, this.defaultState.obj.height);
            //sorry, all state have to have the same height and width
            this.applyState(this.getStateInfo(this.button.currentState));
        }

        public setState(state:ButtonState):void{
            this.applyState(this.getStateInfo(state));
        }

        public changeImages(newGraphic:Container | string, states:ButtonState[]=null):void{
            if(typeof newGraphic=="string"){
                newGraphic = TextureHelper.getInstance().getAsset(newGraphic);
            }
            if(!states){
                this.changeImage(newGraphic);
            }else{
                _.forEach(states, (state:ButtonState)=>{
                    this.changeImage(newGraphic, state);
                });
            }
        }
        
        public changeImage(newGraphic:Container | string, state:ButtonState=ButtonState.up):void{
            if(typeof newGraphic=="string"){
                newGraphic = TextureHelper.getInstance().getAsset(newGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.up){
                this.upGraphic = this.switchImage(newGraphic, this.upGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.down){
                this.downGraphic = this.switchImage(newGraphic, this.downGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.over){
                this.overGraphic = this.switchImage(newGraphic, this.overGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.disabled){
                this.disableGraphic = this.switchImage(newGraphic, this.disableGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.selected){
                this.selectedGraphic = this.switchImage(newGraphic, this.selectedGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.selectedOver){
                this.selectedOverGraphic = this.switchImage(newGraphic, this.selectedOverGraphic);
            }
            if(state==ButtonState.all || state==ButtonState.selectedDown){
                this.selectedDownGraphic = this.switchImage(newGraphic, this.selectedDownGraphic);
            }
            
            if(!this.ignoreButtonSize){
                newGraphic.width = this.button.buttonWidth;
                newGraphic.height = this.button.buttonHeight;
            }else{
                this.placeItemByAlign(newGraphic, this.button.buttonWidth,  this.button.buttonHeight);
            }  
        }

        protected switchImage(newGraphic:Container, oldGraphic:Container):Container{
            if(oldGraphic==this.currentGraphic){
                this.switchGraphic(newGraphic);
            }    
            if(oldGraphic){
                this.sprites.splice(this.sprites.indexOf(oldGraphic), 1);
            }        
            if(this.sprites.indexOf(newGraphic)==-1){
                this.sprites.push(newGraphic);
            }
            return newGraphic;
        }

        protected displayUp():void{
            this.switchGraphic(this.upGraphic);
        }
        
        protected displayOver():void{
            if(this.overGraphic){
                this.switchGraphic(this.overGraphic);
            }
        }

        protected displayDown():void{
            if(this.downGraphic){
                this.switchGraphic(this.downGraphic);
            }
        }

        protected displayDisabled():void{
            if(this.disableGraphic){
                this.switchGraphic(this.disableGraphic);
            }
        }

        protected displaySelected():void{
            if(this.selectedGraphic){
                this.switchGraphic(this.selectedGraphic);
            }
        }
        
        protected displaySelectedOver():void{
            if(this.selectedOverGraphic){
                this.switchGraphic(this.selectedOverGraphic);
            }else if(this.selectedGraphic){
                this.switchGraphic(this.selectedGraphic);
            }  
        }
        
        protected displaySelectedDown():void{
            if(this.selectedDownGraphic){
                this.switchGraphic(this.selectedDownGraphic);
            }else if(this.selectedGraphic){
                this.switchGraphic(this.selectedGraphic);
            }    
        }

        protected switchGraphic(newGraphic:Container):void{
            if(newGraphic==this.currentGraphic) return;
            if(this.currentGraphic){
                this.button.graphicHolder.removeChild(this.currentGraphic);
            }
            this.button.graphicHolder.addChild(newGraphic);
            this.currentGraphic = newGraphic;
        }

        public setText(newText:string, displayId?:string):void{
            
        }

        public cleanUp():void{
            super.cleanUp();
        }
    }
}