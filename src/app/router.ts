import { BasePage } from "./abstract/BasePage";
import { routes } from "./routes";
import notfoundTamplate from "./notFound.html";

export class Router extends BasePage {

    private static _currentParams:Record<string,string>={}

    static setParams(params:Record<string,string>){
        this._currentParams=params;
    }
    public static getParams(){
        return this._currentParams;
    }
    
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
            // return "/";
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

    private matchRoute(route:string,path:string):{params:Record<string,string>}|null{        
        const routeSegments = route.split('/').filter(segment => segment !== '');
        const pathSegments = path.split('/').filter(segment => segment !== '');
        const params:Record<string,string>={};
        if (routeSegments.length !== pathSegments.length) {
            return null;
        }
        for(let i=0;i<routeSegments.length;i++){
            const routeSegment=routeSegments[i];            
            const pathSegment=pathSegments[i];
            if(routeSegment.startsWith(":")){                
                const paramName=routeSegment.slice(1);
                params[paramName]=pathSegment;
            }else if(routeSegment!==pathSegment){
                return null;
            }
        }
        return {params}
        
    }

    getContentRoute(path:string):string{
        try {
            for (const route in routes){
                const paramMatch=this.matchRoute(route,path)
                if(paramMatch){
                    Router.setParams(paramMatch.params)
                    const content=routes[route]
                    return content !== undefined ? content : notfoundTamplate;
                }
            }
            return  notfoundTamplate;
            
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




