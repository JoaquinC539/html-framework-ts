import { BaseComponent } from "../../abstract/BaseComponent";
import { CustomElement } from "../../Base/CustomElement";
import { Router } from "../../Base/Router";
import template from "./Edit.html?raw"
@CustomElement("edit-component")
export class Edit extends BaseComponent{
    private params:Record<string,string>
    private paramsString:string;
    constructor(){
        super();
        this.params={};
        this.paramsString="";
    }
    protected getTemplate(): string {
        return template;
    }
    protected initialize(): void {
        this.params=Router.getParams();
        console.log(this.params);
    }
    protected script(): void {
        // const pre=this.host.querySelector("#paramsp");
        // if(pre){
        //     pre.textContent=JSON.stringify( this.params);
        // }
    }
    
}