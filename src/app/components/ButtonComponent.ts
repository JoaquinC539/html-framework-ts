import { BaseComponent } from "../abstract/BaseComponent";
import { CustomElement } from "../utils/CustomElement";
import template from "./ButtonComponent.html"

@CustomElement("button-component")
export class ButtonComponent extends BaseComponent{
    protected getTemplate(): string {
        return template
    }
    protected script(): void {
        const button = this.querySelector('#buttonc');
        button?.addEventListener('click', (event:Event)=>{
            this.handleClick(event as MouseEvent)
        });
    }
    protected handleClick(event:MouseEvent){
        console.log("button clicked")
    }
    
}
