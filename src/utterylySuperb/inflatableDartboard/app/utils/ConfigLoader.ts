///<reference path="..\..\ui\UIHelper.ts"/>
namespace utterlySuperb.inflatableDartboard.app.utils{
    import Loader = PIXI.loaders.Loader;
    import UIHelper = utterlySuperb.inflatableDartboard.ui.UIHelper;
    export class ConfigLoader{

        public completeSignal:Signal;

        constructor(configPath:string){
            this.completeSignal = new Signal();
            let configLoader:Loader = new Loader();
            configLoader.add("config", configPath);
            configLoader.onComplete.add(this.onConfigLoaded.bind(this));
            configLoader.onError.add(this.onConfigError.bind(this));
            configLoader.load();
        }

        private onConfigLoaded(e:Loader):void{
            if(e.resources.config.data){
                let data:any = e.resources.config.data;
                let configLoader:Loader = new Loader();
                configLoader.onComplete.add(this.configFilesLoaded.bind(this));
                configLoader.onError.add(this.configFilesError.bind(this));
                if(data.images){
                    _.times(data.images.length, (i:number)=>{
                        try{
                            configLoader.add("image_" + i, data.images[i]);
                        }catch(e){
                            Logs.warn("config image error", e)
                        }
                    });
                }
                if(data.uiFiles){
                    _.times(data.uiFiles.length, (i:number)=>{
                        try{
                            configLoader.add("uiFiles_" + i, data.uiFiles[i]);
                        }catch(e){
                            Logs.warn("config ui error", e)
                        }
                    });
                }
                if(data.fonts){
                    let appLoader:AppLoader = AppLoader.getInstance();
                    _.forEach(data.fonts, (fontOb:any)=>{
                        appLoader.addAsset(fontOb.path, fontOb.id, AssetType.font);
                    });                    
                }
                if(data.preloadAssets){
                    _.forEach(data.preloadAssets, (imageToLoad:AssetToLoad)=>{
                        configLoader.add(imageToLoad.reference, imageToLoad.path);
                        if(imageToLoad.type==AssetType.image){
                            TextureHelper.getInstance().setAsset(imageToLoad.reference, imageToLoad.path);
                        }
                    });
                }
                configLoader.load();
            }
        }

        private onConfigError():void{
            Logs.error("onConfigError");
        }

        private configFilesError(e:any):void{
            Logs.error("configFilesError", e);
        }

        private configFilesLoaded(e:Loader):void{
            Logs.whisper("configFilesLoaded", e);
            let appLoader:AppLoader = AppLoader.getInstance();
            _.forEach(e.resources, (resourceData:any)=>{
                if(resourceData.name.indexOf("image")!=-1){
                    if(resourceData.data.images){
                        _.forEach(resourceData.data.images, (imageOb:any)=>{
                            appLoader.addAsset(imageOb.path, imageOb.id, AssetType.image);
                        })
                    }  
                    if(resourceData.data.spriteSheets){
                        _.forEach(resourceData.data.images, (imageOb:any)=>{
                            appLoader.addAsset(imageOb.path, imageOb.id, AssetType.spritesheet);
                        })
                    }                      
                }else if(resourceData.name.indexOf("uiFiles")!=-1){
                    if(resourceData.data.textStyles){
                        let textHelper:UIHelper = UIHelper.getInstance();
                        _.forEach(resourceData.data.textStyles, (textOb:any)=>{
                            textHelper.addTextObject(textOb);
                        });
                    }
                    if(resourceData.data.buttonDisplayers){
                        let buttonHelper:UIHelper = UIHelper.getInstance();
                        _.forEach(resourceData.data.buttonDisplayers, (displayerOb:any)=>{
                            buttonHelper.addDisplayerObject(displayerOb);
                        });
                    }
                    if(resourceData.data.buttons){
                        let buttonHelper:UIHelper = UIHelper.getInstance();
                        _.forEach(resourceData.data.buttons, (buttonOb:any)=>{
                            buttonHelper.addButtonObject(buttonOb);
                        });
                    }
                    if(resourceData.data.nineSlices){
                        let textureHelper:TextureHelper = TextureHelper.getInstance();
                        _.forEach(resourceData.data.nineSlices, (nineSliceOb:any)=>{
                            TextureHelper.getInstance().addNineSliceInfo(nineSliceOb.id, nineSliceOb);
                        });
                    }
                }
            });
            this.completeSignal.dispatch();
            this.completeSignal.dispose();
        }
    }
}