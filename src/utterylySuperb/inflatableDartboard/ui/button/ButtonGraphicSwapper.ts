///<reference path="..\..\app\utils\TextureHelper.ts"/>
namespace utterlySuperb.inflatableDartboard.ui.button{
    import Sprite = PIXI.Sprite;
    import Container = PIXI.Container;
    import Texture = PIXI.Texture;
    import TextureHelper = utterlySuperb.inflatableDartboard.app.utils.TextureHelper;
    import Point = PIXI.Point;
    export class ButtonGraphicSwapper implements IButtonDisplay{

        protected upGraphic:Container;
        protected overGraphic?:Container;
        protected downGraphic?:Container;
        protected disableGraphic?:Container;
        protected selectedGraphic?:Container;
        protected selectedOverGraphic?:Container;
        protected selectedDownGraphic?:Container;
        protected currentGraphic:Container;
        protected displayerOptions:ButtonDisplayOptions;

        //I guess there is a better way of doing this?
        public static DISPLAY_ID:string = "GraphicSwapper";

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this.makeSprites(button, displayerOptions as ButtonDisplayOptionsGraphicsSwapper);
            this.displayerOptions = displayerOptions;
        }

        protected makeSprites(button:Button, displayerOptions:ButtonDisplayOptionsGraphicsSwapper):void{
            this.upGraphic = this.createSprite(displayerOptions.upGraphic, button.config);
            this.overGraphic = this.createSprite(displayerOptions.overGraphic, button.config, displayerOptions.overOffset);
            this.downGraphic = this.createSprite(displayerOptions.downGraphic, button.config, displayerOptions.downOffset);
            this.disableGraphic = this.createSprite(displayerOptions.disableGraphic, button.config, displayerOptions.disableOffset);
            this.selectedGraphic = this.createSprite(displayerOptions.selectedGraphic, button.config, displayerOptions.selectedOffset);
            this.selectedOverGraphic = this.createSprite(displayerOptions.selectedOverGraphic, button.config, displayerOptions.overOffset);
            this.selectedDownGraphic = this.createSprite(displayerOptions.selectedDownGraphic, button.config, displayerOptions.downOffset);
        }

        private createSprite(texture:string, config:ButtonConfigOptions, offset?:Point):Container{
            let sprite:Container = null;
            if(texture){
                sprite = TextureHelper.getInstance().getAsset(texture);
                if(!_.isNaN(config.width)){
                    sprite.width = config.width;
                }
                if(!_.isNaN(config.height)){
                    sprite.height = config.height;
                }
                if(offset){
                    sprite.x = offset.x;
                    sprite.y = offset.y;
                }
            }
            return sprite;
        }

        public setState(button:Button, state:ButtonState):void{
            switch(state){
                case ButtonState.up:
                this.displayUp(button);
                break;
                case ButtonState.over:
                this.displayOver(button);
                break;
                case ButtonState.down:
                this.displayDown(button);
                break;
                case ButtonState.selected:
                this.displaySelected(button);
                break;
                case ButtonState.disabled:
                this.displayDisabled(button);
                break;
                case ButtonState.selectedOver:
                this.displaySelectedOver(button);
                break;
                case ButtonState.selectedDown:
                this.displaySelectedDown(button);
                break;
            }
        }

        protected displayUp(button:Button):void{
            this.switchGraphic(button, this.upGraphic);
        }
        
        protected displayOver(button:Button):void{
            if(this.overGraphic){
                this.switchGraphic(button, this.overGraphic);
            }
        }

        protected displayDown(button:Button):void{
            if(this.downGraphic){
                this.switchGraphic(button, this.downGraphic);
            }
        }

        protected displayDisabled(button:Button):void{
            if(this.disableGraphic){
                this.switchGraphic(button, this.disableGraphic);
            }
        }

        protected displaySelected(button:Button):void{
            if(this.selectedGraphic){
                this.switchGraphic(button, this.selectedGraphic);
            }
        }
        
        protected displaySelectedOver(button:Button):void{
            if(this.selectedOverGraphic){
                this.switchGraphic(button, this.selectedOverGraphic);
            }else if(this.selectedGraphic){
                this.switchGraphic(button, this.selectedGraphic);
            }  
        }
        
        protected displaySelectedDown(button:Button):void{
            if(this.selectedDownGraphic){
                this.switchGraphic(button, this.selectedDownGraphic);
            }else if(this.selectedGraphic){
                this.switchGraphic(button, this.selectedGraphic);
            }    
        }

        protected switchGraphic(button:Button, newGraphic:Container):void{
            if(newGraphic==this.currentGraphic) return;
            if(this.currentGraphic){
                button.graphicHolder.removeChild(this.currentGraphic);
            }
            button.graphicHolder.addChild(newGraphic);
            this.currentGraphic = newGraphic;
        }

        public setText(newText:string, button:Button, displayId?:string):void{
            
        }
    }
}