const {execSync, spawn}=require("child_process");
const chokidar =require("chokidar");
const browserSync = require("browser-sync").create();
const fs = require("fs");

console.log("starting file watcher...")



const watcher = chokidar.watch(["./src/app"], { persistent: true });

browserSync.init({
    proxy:"http://localhost:80",
    files:["build/**/*.*"],
    open:false,
    notify:false
});

function reloadBrowser() {
    browserSync.reload();
}

function startNginx(){
    console.log("Starting Nginx server...");
    try {
        
        const nginxProcess=spawn("cmd.exe",["/c", "cd server && start nginx"], {
            detached: true,
            stdio: "ignore"
        });
        nginxProcess.unref();
    } catch (error) {
        console.error("Failed to start Nginx server:", error.message);
    }
}


function stopNginx() {
    console.log("Stopping Nginx server...");
    try {
        execSync("powershell.exe -Command \"cd server; ./nginx -s quit\"", { stdio: "inherit" });
    } catch (error) {
        console.error("Failed to stop Nginx:", error.message);
    }
}

function rebuild() {
    console.log("Change detected, rebuilding...");
    try {
        console.log("Running build script...");
        execSync("npm run build", { stdio: "inherit" });
    } catch (error) {
        console.error("Build failed:", error.message);
    }
}


startNginx();
rebuild();
watcher.on("change",(path)=>{
    console.log(`File changed: ${path}`);
    rebuild();
    reloadBrowser();
})

watcher.on("error", (error) => {
    console.error("Watcher error:", error.message);
});

console.log("File watcher is running.");

process.on("SIGINT", () => {
    console.log("Process interrupted. Cleaning up...");
    stopNginx();
    process.exit();
});

process.on("SIGTERM", () => {
    console.log("Process terminated. Cleaning up...");
    stopNginx();
    process.exit();
});