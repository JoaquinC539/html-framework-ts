import { BaseComponent } from "../../abstract/BaseComponent";
import tempate from "./index.html";
import  "../../components/ButtonComponent";
import { ButtonComponent } from "../../components/ButtonComponent";
import "../../components/ButtonComponent2"
import { CustomElement } from "../../utils/CustomElement";

@CustomElement("about-page")
export class AboutPage extends BaseComponent{
    protected getTemplate(): string {
        return tempate
    }
    protected script(): void {   
        console.log(ButtonComponent)
    }
}
