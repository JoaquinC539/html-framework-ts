
import content from "./home.html";
import { BasePage } from '../../abstract/BasePage';
import axios from 'axios';

export class HomePage extends BasePage{
    protected fetchedData:any;
    protected getTemplate(): string {
        return content;
    }
    
    protected async asyncInitialize(): Promise<void> {
        
    }
    protected script(): void {
        
        axios.get("https://reqres.in/api/users?page=2")
        // this.fetchData();        
        const button=this.querySelector("#myButton");
        button?.addEventListener("click",()=>{
            console.log("button clicked")
        })
        const element = document.getElementById("texttoModify");
        if (element) {            
            element.innerHTML = "Text modified in script";
        }
    }
        
}

export default customElements.define("home-page", HomePage)  ;



