export function CustomElement(tagName:string){
    return function <T extends CustomElementConstructor> (constructor:T)
    {
        if(!customElements.get(tagName)){
            customElements.define(tagName,constructor)
        }
        return constructor;
    };
}