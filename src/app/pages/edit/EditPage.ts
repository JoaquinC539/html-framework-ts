import { BasePage } from "../../abstract/BasePage";
import { Router } from "../../Router";
import template from './EditPage.html'
export class HomePage extends BasePage{
    protected getTemplate(): string {
        return template;
    }
    protected script(): void {
        console.log(Router.getParams())
    }
    
}
export default customElements.define("edit-page",HomePage);