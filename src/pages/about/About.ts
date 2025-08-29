import { BaseComponent } from "../../abstract/BaseComponent";
import { CustomElement } from "../../Base/CustomElement";
import template from "./About.html?raw"
@CustomElement("about-component")
export class About extends BaseComponent{
    protected getTemplate(): string {
        return template;
    }
    protected script(): void {
        console.log("about")
    }
    
}