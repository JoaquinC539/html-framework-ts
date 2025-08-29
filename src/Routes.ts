import "./pages/about/About";
import "./pages/home/Home";
import "./pages/edit/Edit";
export const Routes:Record<string,string>={
    "/":`<home-component></home-component>`,
    "/about":`<about-component></about-component>`,
    "/edit/:id":`<edit-component></edit-component>`

}