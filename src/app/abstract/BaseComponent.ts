export abstract class BaseComponent extends HTMLElement{
    constructor(){
        super();
    }
    async connectedCallback(){
        
        const template=this.getTemplate();
        this.innerHTML=template;

        await this.asyncInitialize();
        this.initialize();
        this.script();
    }

    protected initialize():void{} 

    protected abstract getTemplate():string

    protected async asyncInitialize():Promise<void>{}    

    protected script(){}
}