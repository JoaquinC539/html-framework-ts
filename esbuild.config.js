const path=require("path");
const fs=require("fs")
const esbuild=require("esbuild");

const htmlPlugin = {
    name: 'html-plugin',
    setup(build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
            let content = await fs.promises.readFile(args.path, 'utf8');
            content = content.replace(/<link\s+rel="stylesheet"\s+href="(.+?\.css)">/g, (_, cssPath) => {
                const cssFilePath = path.resolve(path.dirname(args.path), cssPath);
                const cssContent = fs.existsSync(cssFilePath)
                    ? fs.readFileSync(cssFilePath, 'utf8')
                    : '';
                return `<style>${cssContent}</style>`;
            });
            return {
                contents: `export default ${JSON.stringify(content)};`,
                loader: 'js',
            };
        });
    },
};

// Bundle the browser (renderer process)
const bundleRender=esbuild.build({
    entryPoints:["out/app/index.js"],
    outfile:'build/app/bundle.js',
    bundle:true,
    platform:"browser",
    target:"es2020",
    sourcemap:false,
    minify:true,  
    plugins:[htmlPlugin],
    loader: { '.css': 'css' },
    loader:{".js":"js"}
});


Promise.all([bundleRender])
.then(()=>{
    
    console.log("Build complete.");
})
.catch(()=>process.exit(1))
