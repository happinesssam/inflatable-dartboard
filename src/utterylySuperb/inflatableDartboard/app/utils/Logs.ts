namespace utterlySuperb.inflatableDartboard.app.utils{
    export class Logs{
        private static logsStatus:boolean[] = [true, true, true, true, true];

        public static initLog(initOb:boolean | boolean[]):void{
            if(typeof initOb=="boolean"){
                Logs.setLogLevel(LogLevel.all, initOb);
            }else{
                _.times(Logs.logsStatus.length, (i:number)=>{
                    if(i<initOb.length)Logs.logsStatus[i] = initOb[i];
                })
            }            
        }

        public static setLogLevel(logtype:LogLevel, enabled:boolean){
            if(logtype==LogLevel.all){
                _.fill(Logs.logsStatus, enabled); 
            }
            else{
                Logs.logsStatus[LogLevel.log] = enabled;
            }
        }

        public static log(...params:any[]):void{
            if(Logs.logsStatus[LogLevel.log]){
                console.log.apply(null, params);
            }
        }

        public static whisper(...params:any[]):void{
            if(Logs.logsStatus[LogLevel.whisper]){
                console.log.apply(null, params);
            }
        }

        public static warn(...params:any[]):void{
            if(Logs.logsStatus[LogLevel.warnings]){
                console.warn.apply(null, params);
            }
        }

        public static shout(...params:any[]):void{
            if(Logs.logsStatus[LogLevel.shout]){
                console.log.apply(null, params);
            }
        }

        public static error(...params:any[]):void{
            if(Logs.logsStatus[LogLevel.errors]){
                console.error.apply(null, params);
            }
        }
    }

    export enum LogLevel{
        errors,
        shout,
        warnings,
        log,
        whisper,
        all
    }
}