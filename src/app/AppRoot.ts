import { BasePage } from "./pages/abstract/BasePage";
import content from "./AppRoot.html";
import "./app.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Router";
class AppRoot extends BasePage{
    protected getTemplate(): string {
        return content;
    }
}

customElements.define("app-root",AppRoot);