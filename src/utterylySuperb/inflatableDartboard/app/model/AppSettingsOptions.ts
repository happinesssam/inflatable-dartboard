namespace utterlySuperb.inflatableDartboard.app.model{
    import IPoint = utterlySuperb.inflatableDartboard.utils.interfaces.IPoint;
    export interface AppSettingsOptions{
        renderWidth?:number;
        renderHeight?:number;
        rendererMax?:IPoint;
        rendererMin?:IPoint;
        appWidth?:number;
        appHeight?:number;
        antialias?:boolean;
        containerId?:string;
        configPath?:string;
    }
}