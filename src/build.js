const fs = require("fs");
const path = require("path");

// folders
const SRC = __dirname;                 // build.js lives in src/
const DIST = path.join(__dirname, "../dist");  // output folder at repo root
const TEMPLATES = path.join(SRC, "templates");

// read posts data
const posts = JSON.parse(fs.readFileSync(path.join(SRC, "posts.json"), "utf-8"));

// read templates
const blogPage = fs.readFileSync(path.join(TEMPLATES, "t-blog.html"), "utf-8");
const postTemplate = fs.readFileSync(path.join(TEMPLATES, "post.html"), "utf-8");

// ensure dist folder exists
if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
}

// copy basic files
fs.copyFileSync(path.join(SRC, "index.html"), path.join(DIST, "index.html"));
fs.copyFileSync(path.join(SRC, "style.css"), path.join(DIST, "style.css"));
fs.copyFileSync(path.join(SRC, "about-me.html"), path.join(DIST, "about-me.html"));
fs.copyFileSync(path.join(SRC, "chat.js"), path.join(DIST, "chat.js"));

// copy images recursively
const copyFolder = (src, dest) => {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyFolder(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

copyFolder(path.join(SRC, "images"), path.join(DIST, "images"));

// generate post links for blog page
let postLinks = "";
posts.forEach(post => {
    postLinks += `<li><a href="${post.slug}.html">${post.title}</a></li>`;
});

// write blog.html
const finalBlog = blogPage.replace("{{posts}}", postLinks);
fs.writeFileSync(path.join(DIST, "blog.html"), finalBlog);

// generate individual post pages
posts.forEach(post => {
    const finalPost = postTemplate
        .replace(/{{title}}/g, post.title)
        .replace("{{date}}", post.date)
        .replace("{{content}}", post.content);

    fs.writeFileSync(path.join(DIST, `${post.slug}.html`), finalPost);
});

console.log("site build successful");