import { BaseComponent } from "./abstract/BaseComponent";
import content from "./AppRoot.html";
import "./app.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Router";
import { CustomElement } from "./utils/CustomElement";

@CustomElement("app-root")
class AppRoot extends BaseComponent{
    protected getTemplate(): string {
        return content;
    }
}
