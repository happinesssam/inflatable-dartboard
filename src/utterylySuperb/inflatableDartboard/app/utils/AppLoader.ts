namespace utterlySuperb.inflatableDartboard.app.utils{
    import Loader = PIXI.loaders.Loader;
    import WebfontConfig = WebFont.Config;
    export class AppLoader{
        private static _instance:AppLoader;
        private assetsToLoad:AssetToLoad[];
        public fontCss:string= "css/fonts.css";
        public loadedSignal:Signal;
        public progressSignal:Signal;

        public static getInstance():AppLoader{
            if(!AppLoader._instance)AppLoader._instance = new AppLoader();
            return AppLoader._instance;
        }

        constructor(){
            this.assetsToLoad = [];
            this.loadedSignal = new Signal();
            this.progressSignal = new Signal();
        }

        public addAsset(path:string, reference:string, type:AssetType, path2?:string):void{

        }

        public startLoad():void{
            this.loadFonts();
        }

        private loadPixiAssets():void{

        }

        private pixiAssetsLoaded():void{

        }

        private loadSounds():void{

        }

        private soundsLoaded():void{

        }

        private loadFonts():void{
            let fontsToLoad:AssetToLoad[] = _.filter(this.assetsToLoad, {type:AssetType.font});
            if(fontsToLoad.length>0){
                let fontConfig:WebfontConfig = {active:this.fontsLoaded.bind(this), 
                    inactive:this.fontsError.bind(this),
                    custom: {
                        families: [],
                        urls: [this.fontCss]
                  }};
                _.forEach(fontsToLoad, (fontToLoad:AssetToLoad)=>{
                    fontConfig.custom.families.push(fontToLoad.reference);
                    if(fontToLoad.path && fontConfig.custom.urls.indexOf(fontToLoad.path)==-1){
                        fontConfig.custom.urls.push(fontToLoad.path);
                    }
                });
            }else{
                this.fontsLoaded();
            }           
        }

        private fontsError(e):void{
            console.error("Font load error:" + e.toString());
        }

        private fontsLoaded():void{
            this.loadedSignal.dispatch();
        }
    }

    interface AssetToLoad{
        path:string;
        type:AssetType;
        reference:string;
    }

    export enum AssetType{
        image,
        font,
        sound,
        audioSprite,
        text,
        spritesheet
    }
}