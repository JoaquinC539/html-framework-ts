import { BasePage } from "../../abstract/BasePage";
import tempate from "./index.html";

export class AboutPage extends BasePage{
    protected getTemplate(): string {
        return tempate
    }
    
}
export default customElements.define("about-page",AboutPage);