export function CustomElement(tagName:string){
    return function (constructor:typeof HTMLElement){
        customElements.define(tagName,constructor)
    }
}