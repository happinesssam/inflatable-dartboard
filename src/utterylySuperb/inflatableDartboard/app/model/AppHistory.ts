///<reference path="..\utils\GlobalDispatcher.ts"/>
namespace utterlySuperb.inflatableDartboard.app.model{
    import GlobalDispatcher = utterlySuperb.inflatableDartboard.app.utils.GlobalDispatcher;
    export class AppHistory{
        private static history:HistoryItem[] = [];

        public static hasBack():boolean{
            return AppHistory.history.length>0 && _.last(AppHistory.history).canGoBack;
        }

        public static clearHistory():void{
            AppHistory.history = [];
            GlobalDispatcher.getInstance().dispatch(AppEvents.HISTORY_CHANGE, AppHistory.hasBack());
        }

        public static addToHistory(param:string, notification:string=AppEvents.GO_BACK,canGoBack:boolean=true ):void{
            AppHistory.history.push({param:param, notification:notification, canGoBack:canGoBack});
            GlobalDispatcher.getInstance().dispatch(AppEvents.HISTORY_CHANGE, AppHistory.hasBack());
        }

        public static goBack():void{
            if(AppHistory.hasBack()){
                let destination:HistoryItem = AppHistory.history.pop();
                GlobalDispatcher.getInstance().dispatch(destination.notification,  destination.param);
                GlobalDispatcher.getInstance().dispatch(AppEvents.HISTORY_CHANGE, AppHistory.hasBack());
            }
        }

        public getBack():HistoryItem{
            if(AppHistory.hasBack()){
                return AppHistory.history.pop();
            }
            return null;
        }
    }
    export interface HistoryItem{
        notification:string;
        param:string;
        canGoBack:boolean;
    }
}