///<reference path="..\..\..\app\utils\TextureHelper.ts"/>
///<reference path="AbstractButtonDisplayer.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.button{
    import Sprite = PIXI.Sprite;
    import Container = PIXI.Container;
    import Texture = PIXI.Texture;
    import TextureHelper = utterlySuperb.inflatableDartboard.app.utils.TextureHelper;
    import Point = PIXI.Point;
    export class ButtonGraphicSwapper extends AbstractButtonDisplayer{

        protected holder:Sprite;
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

            this.holder = new Sprite();
            if(_.isNumber(this.displayerOptions.rotation)) this.holder.rotation = this.displayerOptions.rotation;
            if(this.displayerOptions.flipX)this.holder.scale.x = -1;
            if(this.displayerOptions.flipY)this.holder.scale.y = -1;
            this.addContainer();
            
            this.ignoreButtonSize = (_.isNumber(displayerOptions.width) && _.isNumber(displayerOptions.height));
            if(this.ignoreButtonSize){
                this.setDisplayerDimensions(displayerOptions.width, displayerOptions.height);
            }else{
                this.buttonDimensionChange();
            }
        }

        protected addContainer():void{
            this.button.graphicHolder.addChild(this.holder);
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
                let stateWithSameGraphic:StateInfo = _.find(this.states, (state:StateInfo)=>{
                    return state.obj.name == texture;
                });
                if(stateWithSameGraphic){
                    sprite = stateWithSameGraphic.obj;
                }else{
                    sprite = TextureHelper.getInstance().getAsset(texture, texture);
                    this.sprites.push(sprite);
                    if(this.displayerOptions.centreAnchor && sprite["anchor"])sprite["anchor"].set(0.5);
                }                
            }
            return sprite;
        }

        protected applyState(stateInfo:StateInfo):void{
            this.holder.x = this.statesPosition.x + stateInfo.offset.x;
            this.holder.y = this.statesPosition.y + stateInfo.offset.y;
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
                this.changeImage(newGraphic, ButtonState.all);
            }else{
                _.forEach(states, (state:ButtonState)=>{
                    this.changeImage(newGraphic, state);
                });
            }
        }
        
        public changeImage(newGraphic:Container | string, state:ButtonState=ButtonState.up, offset:Point = null):void{
            let doResize:boolean;//update states that are piggybacking on up...
            if(typeof newGraphic=="string")newGraphic=this.createGraphic(newGraphic);
            if(this.ignoreButtonSize){
                this.setDisplayerDimensions(this.displayerOptions.width, this.displayerOptions.height);
            }else{
                this.buttonDimensionChange();
            }
            if(state==ButtonState.all){                
                _.forEach(this.states, (stateInfo:StateInfo)=>{
                    stateInfo.obj=newGraphic;
                    if(offset)stateInfo.offset = offset;
                });
                doResize = true;
                this.setState(this.button.currentState);
            }else{
                let stateInfo:StateInfo = this.getStateInfo(state);
                stateInfo.setOffset(offset);
                stateInfo.obj = newGraphic;
                doResize = true;
                if(this.button.currentState==state){
                    this.applyState(stateInfo);
                }   
            }        
        }

        protected switchGraphic(newGraphic:Container):void{
            if(newGraphic==this.currentGraphic) return;
            if(this.currentGraphic){
                this.holder.removeChild(this.currentGraphic);
            }
            this.holder.addChild(newGraphic);
            this.currentGraphic = newGraphic;
        }

        public setText(newText:string, displayId?:string):void{
            
        }

        public cleanUp():void{
            super.cleanUp();
        }
    }
}