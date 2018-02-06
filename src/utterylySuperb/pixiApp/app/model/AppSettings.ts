namespace utterlySuperb.pixiApp.app.model{
    export class AppSettings{
        public renderWidth:number = 800;
        public renderHeight:number = 600;
        public appWidth:number = 800;
        public appHeight:number = 600;
        public antialias:boolean = true;
        public containerId:string;

        constructor(options:AppSettingsOptions){

        }
    }
}