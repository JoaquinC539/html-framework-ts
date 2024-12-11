import { BasePage } from "./pages/abstract/BasePage";
import { routes } from "./routes";

const rootDiv = document.getElementById('app')!;

// import 

export class Router extends BasePage {
    
    protected getTemplate(): string {
        const path=this.checkInitialRoute();  
        history.pushState({}, "", path);       
        return this.getContentRoute(path);
    }

    protected async asyncInitialize(): Promise<void> {
        await this.setAnchorElements();
    }
    protected initialize(): void {
        this.setPopStateListener();
    }

    checkInitialRoute(): string {
        const protocol = window.location.protocol;
        const pathname = window.location.pathname;
        if (protocol === "file:") {
            return "/";
        } else {
            const segments = pathname.split("/");
            const route = segments[segments.length - 1] === "index.html" ? "/" : pathname
            return route;
        }
    }

    setAnchorElements(): void {
        document.querySelectorAll("a").forEach((link: HTMLAnchorElement) => {
            const refLink: string | null = link.getAttribute("href");
            if (refLink !== null) {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.renderRoute(refLink,true);
                })
            }
        })
    }

    renderRoute(path: string,shouldPushState:boolean):void {
        const content=this.getContentRoute(path);
        this.innerHTML=content;
        this.setAnchorElements();
        if(shouldPushState){
            history.pushState({}, "", path); 
        }
               
    }

    getContentRoute(path:string):string{
        try {
            const content = routes[path];
            return content !== undefined ? content : `<h1>404 - Page Not Found</h1>`;
        } catch (error) {
            console.error(error)
            return  `<h1>500 - Error in router</h1>`;
        }        
    }
    private setPopStateListener():void{
        window.addEventListener("popstate",()=>{
            const path=window.location.pathname;
            this.renderRoute(path,false);
        })
    }
}
export default customElements.define("router-outlet", Router)




