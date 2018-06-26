///<reference path="Logs.ts"/>
namespace utterlySuperb.inflatableDartboard.app.utils{
    import Container = PIXI.Container;
    import Sprite = PIXI.Sprite;
    import Texture = PIXI.Texture;
    import NineSlicePlane = PIXI.mesh.NineSlicePlane;
    import Logs = utterlySuperb.inflatableDartboard.app.utils.Logs;
    export class TextureHelper{
        private assetMap:_.Dictionary<string> = {};
        private nineSlices:_.Dictionary<NineSliceDef> = {};
        private static _instance:TextureHelper;

        public static getInstance():TextureHelper{
            if(!TextureHelper._instance)TextureHelper._instance = new TextureHelper();
            return TextureHelper._instance;
        }

        public getAssetURl(id:string):string{
            Logs.whisper("getAssetURl", id, this.assetMap)
            if(this.assetMap[id]){
                return this.assetMap[id];
            }
            return id;
        }

        public setAsset(id:string, url:string):void{
            if(this.assetMap[id]&& url!=this.assetMap[id]){
                Logs.warn("Mapped asset twice:" + id);
            }
            this.assetMap[id] = url;
        }

        public addNineSliceInfo(id:string, ob:NineSliceDef):void{
            this.nineSlices[id] = ob;
        }

        public getAsset(id:string, name:string="", notNineSlice:boolean=false):Container{
            if(this.nineSlices[id] && !notNineSlice){
                let texture:Texture = Texture.from(this.getAssetURl(this.nineSlices[id].texture));
                if(texture){
                    let left:number = this.nineSlices[id].left | 0;
                    let right:number = this.nineSlices[id].right | 0;
                    let top:number = this.nineSlices[id].top | 0;
                    let bottom:number = this.nineSlices[id].bottom | 0;
                    let nineSlice:NineSlicePlane = new NineSlicePlane(texture, left, top, right, bottom);
                    nineSlice.name = name;
                    return nineSlice;
                }
            }else{
                let texture:Texture = Texture.from(this.getAssetURl(id));
                if(texture){
                    let sprite:Sprite = new Sprite(texture);
                    sprite.name = name;
                    return sprite;
                }               
            }
            return null;
        }
    }
    export interface NineSliceDef{
        id:string;
        texture:string;
        left?:number;
        right?:number;
        top?:number;
        bottom?:number;
    }
}