namespace utterlySuperb.inflatableDartboard.ui.widgets{
    import IPoint = utterlySuperb.inflatableDartboard.utils.interfaces.IPoint;
    export class WidgetDef{
        public id:string;
        public permanent:boolean;
        public align:string = "c";
        public offset:IPoint;
        public positionBySize:boolean;
        public onPixel:boolean;
        public depth:number = 0;
        public content:any;
        constructor(id:string, content:any, align:string="c", offset:IPoint = null){
            this.id = id;
            this.content = content;
            this.align = align;
            this.offset = offset;
        }
    }
}
