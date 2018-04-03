namespace utterlySuperb.inflatableDartboard.app.utils{
    export class GlobalDispatcher{
        private static _instance:GlobalDispatcher;

        private signals:_.Dictionary<Signal> = {};

        public static getInstance():GlobalDispatcher{
            if(!GlobalDispatcher._instance)GlobalDispatcher._instance = new GlobalDispatcher();
            return GlobalDispatcher._instance;
        }

        constructor(){

        }

        public reset():void{
            this.signals = {};
        }

        public add(signalId:string, callBack:()=>any):void{
            if(!this.signals[signalId])this.signals[signalId] = new Signal();
            this.signals[signalId].add(callBack);
        }

        public addOnce(signalId:string, callBack:()=>any):void{
            if(!this.signals[signalId])this.signals[signalId] = new Signal();
            this.signals[signalId].addOnce(callBack);
        }

        public remove(signalId:string, callBack:()=>any):void{
            if(!this.signals[signalId]) return;
            this.signals[signalId].remove(callBack);
        }

        public dispatch(signalId:string, param:any = null):void{
            if(!this.signals[signalId]) return;
            this.signals[signalId].dispatch(param);
        }
    }
}