namespace utterlySuperb.inflatableDartboard.app.utils{
    import Loader = PIXI.loaders.Loader;
    import WebfontConfig = WebFont.Config;
    export class AppLoader{
        private static _instance:AppLoader;
        private assetsToLoad:AssetToLoad[];
        public fontCss:string= "css/fonts.css";
        public loadedSignal:Signal;
        public progressSignal:Signal;
        public imagesWeight:number = 1;
        public soundsWeight:number = 1;
        private configLoaded:boolean;
        private assetsAdded:boolean;

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
            this.assetsToLoad.push({path:path, reference:reference, type:type, path2:path2})
        }

        public startLoad():void{
            this.assetsAdded = true;
            this.checkBeginLoad();
        }

        public configHasLoaded():void{
            this.configLoaded = true;
            this.checkBeginLoad();
        }

        private checkBeginLoad():void{
            if(this.assetsAdded && this.configLoaded){
                this.loadPixiAssets();
            }
        }

        private loadPixiAssets():void{
            let imagesToLoad:AssetToLoad[] = _.filter(this.assetsToLoad, {type:AssetType.image });
            if(imagesToLoad.length){
                let loader:Loader = new Loader();
                _.forEach(imagesToLoad, (imageToLoad:AssetToLoad)=>{
                    loader.add(imageToLoad.reference, imageToLoad.path);
                    if(imageToLoad.type==AssetType.image){
                        TextureHelper.getInstance().setAsset(imageToLoad.reference, imageToLoad.path);
                    }
                });
                loader.onComplete.add(this.pixiAssetsLoaded.bind(this));
                loader.onProgress.add(this.pixiAssetsProgress.bind(this));
                loader.load();
            }else{
                this.loadSounds();
            }
        }
        
        private pixiAssetsProgress(e):void{
console.log("pixiAssetsProgress", e)
        }

        private pixiAssetsLoaded():void{
            this.loadSounds();
        }

        private loadSounds():void{
            let soundsToLoad:AssetToLoad[] = _.filter(this.assetsToLoad, {type:AssetType.sound});
            let audioSpritesToLoad:AssetToLoad[] = _.filter(this.assetsToLoad, {type:AssetType.audioSprite});
            if(soundsToLoad.length || audioSpritesToLoad.length){

            }else{
                this.soundsLoaded();
            }
        }

        private soundsLoaded():void{
            this.loadFonts();
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
                WebFont.load(fontConfig);
            }else{
                this.fontsLoaded();
            }           
        }

        private fontsError():void{
            console.error("Font load error:");
        }

        private fontsLoaded():void{
            this.loadedSignal.dispatch();
        }
    }

    interface AssetToLoad{
        path:string;
        type:AssetType;
        reference:string;
        path2:string;
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