import { BasePage } from "../abstract/BasePage";
import template from "./Button.html"
export class Button extends BasePage{
    protected getTemplate(): string {
        return template
    }
    protected script(): void {
        
    }
    private handleClick(event:MouseEvent){
        console.log("button clicked")
    }
    
}