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

        public init(button:Button, displayerOptions:ButtonDisplayOptions):void{
            this.makeSprites(button, displayerOptions as ButtonDisplayOptionsGraphicsSwapper);
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

        public  displayUp(button:Button):void{
            this.switchGraphic(button, this.upGraphic);
        }
        
        public  displayOver(button:Button):void{
            if(this.overGraphic){
                this.switchGraphic(button, this.overGraphic);
            }
        }

        public  displayDown(button:Button):void{
            if(this.downGraphic){
                this.switchGraphic(button, this.downGraphic);
            }
        }

        public  displayDisabled(button:Button):void{
            if(this.disableGraphic){
                this.switchGraphic(button, this.disableGraphic);
            }
        }

        public  displaySelected(button:Button):void{
            if(this.selectedGraphic){
                this.switchGraphic(button, this.selectedGraphic);
            }
        }
        
        public  displaySelectedOver(button:Button):void{
            if(this.selectedOverGraphic){
                this.switchGraphic(button, this.selectedOverGraphic);
            }else if(this.selectedGraphic){
                this.switchGraphic(button, this.selectedGraphic);
            }  
        }
        
        public displaySelectedDown(button:Button):void{
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

        public  setText(newText:string, button:Button):void{
            
        }
    }
}