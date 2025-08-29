export abstract class BaseComponent extends HTMLElement{
    constructor(){
        super();
        this.host=this;
    }
    protected useShadow=false;
    protected host:this|ShadowRoot;
    
    async connectedCallback(){   
        if(this.useShadow && !this.shadowRoot){
            this.attachShadow({mode:"open"})
        }

        const template=this.getTemplate();
        this.render(template);
        try {
            await this.asyncInitialize();
        } catch (err) {
            console.error(`${this.tagName} asyncInitialize error:`, err);
        }        
        this.initialize();
        this.script();
    }

    protected render(html:string){
        const tpl = document.createElement("template");
        tpl.innerHTML = html.trim();
        const host = this.shadowRoot ?? this;
        this.host=host;
        host.innerHTML="";
        host.appendChild(tpl.content.cloneNode(true))
    }
    protected initialize():void{} 

    protected abstract getTemplate():string

    protected async asyncInitialize():Promise<void>{}    

    protected script(){}
}