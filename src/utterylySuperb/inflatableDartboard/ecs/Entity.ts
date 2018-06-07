namespace utterlySuperb.inflatableDartboard.ecs{
    export class Entity{
        public components:_.Dictionary<Component> = {};

        public hasComponent(id:string):boolean{
            return this.components[id]!=undefined;
        }

        public getComponent(id:string):Component{
            return this.components[id];
        }

        public addComponent(component:Component):void{
            this.components[component.id] = component;
        }

        public removeComponent(id:string):Component{
            let component:Component = this.components[id];
            if(component){
                component.entity = undefined;
                this.components[id] = undefined;
            }
            return component;
        }
    }
}