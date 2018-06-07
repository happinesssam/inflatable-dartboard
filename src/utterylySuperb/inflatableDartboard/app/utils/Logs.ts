namespace utterlySuperb.inflatableDartboard.app.utils{
    export class Logs{
        public static OFF:number = 0;
        public static ERRORS:number = 1;
        public static SHOUT:number = 2;
        public static WARNINGS:number = 3;
        public static LOGS:number = 4;
        public static ALL:number = 5;

        private static _logLevel:number = Logs.LOGS;

        private static logsStatus:boolean[] = [true, true, true, true, true];

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