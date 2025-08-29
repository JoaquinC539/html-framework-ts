import { BaseComponent } from "../../abstract/BaseComponent";
import { CustomElement } from "../../Base/CustomElement";
import template from "./Home.html?raw"
@CustomElement("home-component")
export class Home extends BaseComponent{
    protected getTemplate(): string {
        return template;
    }
    protected script(): void {
        console.log("home")
    }
    
}