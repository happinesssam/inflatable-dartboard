namespace utterlySuperb.inflatableDartboard.ui
{
    import Container = PIXI.Container;
    import IUIComponent = utterlySuperb.inflatableDartboard.ui.interfaces.IUIComponent;
    export class UIComponent extends Container implements IUIComponent{
        public id:string;
    }
}