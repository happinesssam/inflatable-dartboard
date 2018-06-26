///<reference path="..\ui\text\TextField.ts"/>
///<reference path="..\ui\scrollbar\Scrollbar.ts"/>
namespace utterlySuperb.inflatableDartboard.test{
    import App = utterlySuperb.inflatableDartboard.app.App;
   
    export class TestApp extends App{
        constructor(){
            super({renderWidth:800, renderHeight:600, containerId:"game", logSettings:false
            , configPath:"assets/data/config.json"});

            this.startUp();
        }

        protected addPageDefs():void{
            this.addPageDef("test0", TestPage0, [], "", true);
        }
    }
}