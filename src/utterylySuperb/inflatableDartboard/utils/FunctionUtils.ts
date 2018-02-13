///<reference path="..\..\..\..\node_modules\@types\lodash\index.d.ts"/>

namespace utterlySuperb.inflatableDarboard.utils{
    export class FunctionUtils{
        public static stringToFunction(str:string):any {
            var arr:string[] = str.split(".");
          
            var fn:any = (window || this);
            _.forEach(arr, (element:string)=>{
                fn = fn[element];
            });
          
            if (typeof fn !== "function") {
              throw new Error("function not found");
            }          
            return  fn;
          };
    }
}