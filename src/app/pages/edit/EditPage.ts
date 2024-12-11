import { BasePage } from "../../abstract/BasePage";
import template from './EditPage.html'
export class HomePage extends BasePage{
    protected getTemplate(): string {
        return template;
    }
    
}
export default customElements.define("edit-page",HomePage);