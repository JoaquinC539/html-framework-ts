import { BaseComponent } from "../../abstract/BaseComponent";
import { Router } from "../../Router";
import template from './EditPage.html'
export class HomePage extends BaseComponent{
    protected getTemplate(): string {
        return template;
    }
    protected script(): void {
        console.log(Router.getParams())
        const params=Router.getParams();
        document.getElementById("params")!.innerHTML=JSON.stringify(params);
    }
    
}
export default customElements.define("edit-page",HomePage);