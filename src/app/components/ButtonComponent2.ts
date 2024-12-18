import { CustomElement } from "../utils/CustomElement";
import { ButtonComponent } from "./ButtonComponent";

@CustomElement("button-component2")
export class ButtonComponent2 extends ButtonComponent{

    protected script(): void {
        super.script();       
    }

    

    protected handleClick(event:MouseEvent):void{
        console.log("ButtonComponent2: button clicked");
        alert("ButtonComponent2 custom behavior!");
    }
}