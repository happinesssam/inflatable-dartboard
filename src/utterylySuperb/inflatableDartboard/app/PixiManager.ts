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
            this.render();
        }

        private render() {
            requestAnimationFrame(this.render.bind(this));
        
            this.renderer.render(this.stage);
        }
    }
}