import "./pages/home/HomePage"
import "./pages/about/AboutPage"
import "./pages/edit/EditPage"
export const routes: { [key: string]: string  } = {    
    "/":"<home-page></home-page>",
    '/about': "<about-page></about-page>",
    '/edit/id':`<edit-page></edit-page>`,
    '/edit/:id':`<edit-page></edit-page>`,
    '/edit/:id/page/:username':`<edit-page></edit-page>`
};