namespace utterlySuperb.inflatableDartboard.ui.button{
    import Sprite = PIXI.Sprite;
    import Texture = PIXI.Texture;
    export class ButtonGraphicSwapper implements IButtonDisplay{

        protected upGraphic:Sprite;
        protected overGraphic?:Sprite;
        protected downGraphic?:Sprite;
        protected disableGraphic?:Sprite;
        protected selectedGraphic?:Sprite;
        protected selectedOverGraphic?:Sprite;
        protected selectedDownGraphic?:Sprite;
        protected displayerOptions:ButtonDisplayOptions;

        //I guess there is a better way of doing this?
        public static DISPLAY_ID:string = "utterlySuperb.inflatableDartboard.ui.button.ButtonGraphicSwapper";

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this.makeSprites(button, displayerOptions as ButtonDisplayOptionsGraphicsSwapper);
            this.displayerOptions = displayerOptions;
        }

        protected makeSprites(button:Button, displayerOptions:ButtonDisplayOptionsGraphicsSwapper):void{
            this.upGraphic = this.createSprite(displayerOptions.upGraphic, button.config);
            this.overGraphic = this.createSprite(displayerOptions.overGraphic, button.config);
            this.downGraphic = this.createSprite(displayerOptions.downGraphic, button.config);
            this.disableGraphic = this.createSprite(displayerOptions.disableGraphic, button.config);
            this.selectedGraphic = this.createSprite(displayerOptions.selectedGraphic, button.config);
            this.overGraphic = this.createSprite(displayerOptions.overGraphic, button.config);
            this.selectedOverGraphic = this.createSprite(displayerOptions.selectedOverGraphic, button.config);
            this.selectedDownGraphic = this.createSprite(displayerOptions.selectedDownGraphic, button.config);
        }

        private createSprite(texture:Texture, config:ButtonConfigOptions):Sprite{
            let sprite:Sprite = null;
            if(texture){
                sprite = new Sprite(texture);
                if(!_.isNaN(config.width)){
                    sprite.width = config.width;
                }
                if(!_.isNaN(config.height)){
                    sprite.width = config.height;
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

        protected switchGraphic(button:Button, newGraphic:Sprite):void{
            button.graphicHolder.removeChildren();
            button.graphicHolder.addChild(newGraphic);
        }

        public setText(newText:string, button:Button, displayId?:string):void{
            
        }
    }
}