namespace utterlySuperb.inflatableDartboard.app{
    import AppSettings = utterlySuperb.inflatableDartboard.app.model.AppSettings;
    import Container = PIXI.Container;
    export class PixiManager{
        private static _instance:PixiManager;
        public container: HTMLElement;
        public stage: Container;
        private renderer:PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        constructor(){
            this.stage = new Container();
        }

        public static getInstance():PixiManager{
            if(!PixiManager._instance)PixiManager._instance = new PixiManager();
            return PixiManager._instance;
        }

        public initPixi(appSettings:AppSettings):void{
            this.renderer = PIXI.autoDetectRenderer(appSettings.renderWidth, appSettings.renderHeight,
                 { "antialias": appSettings.antialias });

            this.container = appSettings.containerId ? document.getElementById(appSettings.containerId)
             || document.body : document.body;
            this.container.appendChild(this.renderer.view);            
            this.resize(appSettings);
            this.render();
            window.onresize = this.resize.bind(this, appSettings);
        }

        public resize(appSettings:AppSettings):void{
            //I guess I can do CSS here as well
            let windowWidth:number = window.innerWidth;
            let windowHeight:number = window.innerHeight;
            let windowRatio:number = windowHeight/windowWidth;
            let rendererWidth:number = Math.min(appSettings.rendererMax.x, Math.max(appSettings.rendererMin.x, windowWidth));
            let rendererHeight:number = Math.min(appSettings.rendererMax.y, Math.max(appSettings.rendererMin.y, windowHeight));
            let minRenderRatio:number = appSettings.rendererMin.y/appSettings.rendererMax.x;
            let maxRenderRatio:number = appSettings.rendererMax.y/appSettings.rendererMin.x;
            let cssWidth:number = appSettings.rendererMin.x;
            let cssHeight:number = appSettings.rendererMin.y;
            let cssX:number = 0;
            let cssY:number = 0;
            if(windowRatio>=minRenderRatio && windowRatio<=maxRenderRatio){
                //can get without stretch
                if(windowRatio>1){
                    //height more than width
                    rendererWidth = Math.min(appSettings.rendererMax.x, Math.max(appSettings.rendererMin.x, windowWidth));
                    rendererHeight = Math.round(rendererWidth * windowRatio);
                }else{
                    rendererHeight = Math.min(appSettings.rendererMax.y, Math.max(appSettings.rendererMin.y, windowHeight));
                    rendererWidth = Math.round(rendererHeight / windowRatio);
                }
            }else if(windowRatio>maxRenderRatio){
                //use max ratio
                rendererWidth = Math.min(appSettings.rendererMax.x, Math.max(appSettings.rendererMin.x, windowWidth));
                rendererHeight = Math.round(windowWidth / rendererWidth * appSettings.rendererMax.y);
            }else{
                //use min ratio
                rendererHeight = Math.min(appSettings.rendererMax.y, Math.max(appSettings.rendererMin.y, windowHeight));
                rendererWidth = Math.round(windowHeight / rendererHeight * appSettings.rendererMax.x);
            }
            let rendererRatio:number = rendererHeight/rendererWidth;
            switch(appSettings.fillType){
                case AppSettings.NO_RESIZE:
                break;
                case AppSettings.STRETCH:
                //Stretch to window size, so easy
                cssWidth = windowWidth;
                cssHeight = windowHeight;                
                break;
                case AppSettings.LETTER_BOX:
                if(rendererRatio>windowRatio){
                    cssHeight = windowHeight;
                    cssWidth = Math.round(rendererWidth * windowHeight / rendererHeight);
                }else{
                    cssWidth = windowWidth;
                    cssHeight = Math.round(rendererHeight * windowWidth / rendererWidth);
                }
                cssX = Math.round((windowWidth - cssWidth)/2);
                cssY = Math.round((windowHeight - cssHeight)/2);
                break;
                case AppSettings.BEST_FIT:
                break;
            }
            this.renderer.resize(rendererWidth, rendererHeight);
            this.renderer.view.style.position = "absolute";
            this.renderer.view.style.width = cssWidth + "px";
            this.renderer.view.style.height = cssHeight + "px";
            this.renderer.view.style.left = cssX + "px";
            this.renderer.view.style.top = cssY + "px";

        }

        private render() {
            requestAnimationFrame(this.render.bind(this));
        
            this.renderer.render(this.stage);
        }
    }
}