namespace utterlySuperb.inflatableDartboard.app.utils{
    export class TextureHelper{
        private assetMap:_.Dictionary<string> = {};
        private static _instance:TextureHelper;

        public static getInstance():TextureHelper{
            if(!TextureHelper._instance)TextureHelper._instance = new TextureHelper();
            return TextureHelper._instance;
        }

        public getAssetURl(id:string):string{
            console.log("getAssetURl", id, this.assetMap)
            if(this.assetMap[id]){
                return this.assetMap[id];
            }
            return id;
        }

        public setAsset(id:string, url:string):void{
            if(this.assetMap[id]&& url!=this.assetMap[id]){
                console.error("Mapped asset twice:" + id);
            }
            this.assetMap[id] = url;
            console.log("setAsset", id, url, this.assetMap)
        }
    }
}