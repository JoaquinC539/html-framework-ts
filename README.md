#  Minimalistic Framework

## Introduction

This framework is designed to be a lightweight, dependency-free solution for building modern web applications. Built entirely with TypeScript and native browser APIs, it aims to provide developers with a robust foundation for creating reusable components and managing simple routing without relying on external libraries or frameworks.

### Why This Framework?

Modern web development often involves heavy frameworks and libraries that introduce complexity, dependencies, and performance overhead. This framework takes a different approach:

- **Minimalistic Core**: No runtime dependencies. The framework focuses on using what the browser already provides, with TypeScript offering type safety and developer-friendly features.
- **Custom Components**: A built-in, extendable `BaseComponent` class allows you to define web components with clear lifecycle hooks for asynchronous and synchronous initialization.
- **Simple Routing**: Manage URL-based navigation through a flexible router that renders components dynamically based on defined routes.
- **Developer-Friendly**: Designed with a lean developer workflow in mind, using only essential dev tools like `esbuild` for bundling, `chokidar` for file watching, and `browser-sync` for live reloading.
- **Compatibility**: Full compatiblity ready to use for web and electron.

### Who Is This For?

This framework is ideal for developers who:
- Want to build simple, single-page applications (SPAs) without the overhead of large libraries.
- Prefer to have full control over their application architecture.
- Appreciate minimalism and the use of native browser capabilities.

### Key Features

- **No External Dependencies**: Fully functional with zero runtime dependencies. Dev tools like `esbuild` and `typescript` are included only for development and build-time enhancements.
- **Extendable Components**: Easily create and manage reusable components with the `BaseComponent` class.
- **Routing Made Easy**: A built-in router handles page navigation and route-based rendering.
- **TypeScript-Powered**: Provides type safety and modern JavaScript features, ensuring a robust and maintainable codebase.

### Getting Started

The first release is distributed as a ZIP file containing all the essential files, including:
- A working demo application to showcase routing and component usage.
- Pre-configured build and development scripts.

To get started:

1. Download the release ZIP and extract its contents.
2. Install the necessary development dependencies:
   ```bash
   npm install
3. Use the provided scripts from the `package.json` for development and production:

   - **`build`**: 
     
     "build": "node build.js"
     ```
     Compiles TypeScript files into the `/out` directory, processes HTML and TypeScript into bundled JavaScript, and copies public folder assets

   - **`tscompile`**:
     ```bash
     "tscompile": "tsc --project tsconfig.app.json"
     ```
     Only compiles TypeScript files based on the specified configuration in `tsconfig.app.json`. This is primarily used for debugging or verifying TypeScript compilation.

   - **`dev`**:
     ```bash
     "dev": "node watcher.js"
     ```
     Runs a watcher script that observes file changes and automatically rebuilds and reloads the application for a smoother development experience.


### Application Structure

The framework starts with the `index.html` and `index.ts` file, which serves as the entry point:
- The router is already integrated and functional in `AppRoot.ts` and `AppRoot.html` ready to output routes in `routes.ts`

### Defining Routes

The framework uses a declarative approach to manage routes. Each route is defined in the `routes.ts` file, which maps URLs to their corresponding page components:


```typescript
import "./pages/home/HomePage";
import "./pages/edit/EditPage";
export const routes: { [key: string]: string } = {    
    "/": "<home-page></home-page>",
    "/edit/:id": `<edit-page></edit-page>`,
};
````
It supports routing with params marked with the ":" start

### Base Class and Custom Elements

The framework is built around a base class, `BaseComponent`, and a decorator, `CustomElement`, to simplify the creation of reusable components and pages. 
#### Base Component

The `BaseComponent` is an abstract class It provides lifecycle hooks for initialization and a method to define the component's template in sequent order using only common TS/JS for script initalization:

```typescript
protected abstract getTemplate(): string;
protected async asyncInitialize(): Promise<void> {}
protected initialize(): void {}  
protected script(): void {}

````
### Components interaction based on Event Listeners

To handle user interactions like clicks, form submissions, or other events, event listeners should be set in the `initialize` or 'script' method of the component. This ensures the events are bound to elements in the component's template after it is rendered.

**`ButtonComponent.html`**:

```html
<button id="buttonc">Button to test</button>
<p id="display">You have not clicked the button</p>

````
**`ButtonComponent.ts`**:
````typescript
@CustomElement("button-component")
export class ButtonComponent extends BaseComponent {
    protected getTemplate(): string {
        return template;
    }
    protected initialize(): void {
        const button = this.querySelector('#buttonc');
        button?.addEventListener('click', (event: Event) => {
            this.handleClick(event as MouseEvent);
        });
    }
    protected handleClick(event: MouseEvent) {
        const pelement = document.getElementById("display");
        if (pelement !== null) {
            pelement.innerText = "You clicked the button";
        }
    }
}
````
