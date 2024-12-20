const {execSync, spawn}=require("child_process");
const chokidar =require("chokidar");
const browserSync = require("browser-sync").create();
const fs = require("fs");


let serverProcess;
console.log("starting file watcher...")

const watcher = chokidar.watch(["./src/app"], { persistent: true });

browserSync.init({
    proxy:"http://localhost:8081",
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

function startServer(){
    console.log("Starting server...");;
    try {
        serverProcess=spawn("node",["./server/server.js"],{
            detached :true,
            stdio:"inherit"
        })
    } catch (error) {
        console.error("Failed to start server: ",error.message);
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
function stopServer(){
    
    if(serverProcess && serverProcess.pid){
        console.log(`Stopping server with PID: ${serverProcess.pid}`);  
        try {
            process.kill(serverProcess.pid);
        } catch (error) {
             console.error("Failed to stop server:", error.message);
        }
    }else{
        console.log("Server process not found.");
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


// startNginx();
startServer();
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
    // stopNginx();
    stopServer();
    process.exit();
});

process.on("SIGTERM", () => {
    console.log("Process terminated. Cleaning up...");
    // stopNginx();
    stopServer();
    process.exit();
});