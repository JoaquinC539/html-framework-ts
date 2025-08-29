import { BaseComponent } from "./abstract/BaseComponent";
import template from "./App.html?raw";
import { CustomElement } from "./Base/CustomElement.ts";
import { setupCounter } from './counter.ts'
import "./Base/Router.ts";
@CustomElement("app-root")
export class App extends BaseComponent{    
    constructor(){
        super();       
    }
    protected getTemplate(): string {
        return template
    }    
    protected script(): void {
        
        const btn= this.host.querySelector<HTMLButtonElement>('#counter');
        if(btn){
            setupCounter(btn)
        }
        
    }
    
}