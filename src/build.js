const fs = require("fs");
const path = require("path");

// base paths
const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");     
const TEMPLATES = path.join(SRC, "templates");

// read posts data
const posts = JSON.parse(fs.readFileSync(path.join(SRC, "posts.json"), "utf-8"));

// read post template and blog page
const blogPage = fs.readFileSync(path.join(TEMPLATES, "t-blog.html"), "utf-8");
const postTemplate = fs.readFileSync(path.join(TEMPLATES, "post.html"), "utf-8");

// dist folder check
if (!fs.existsSync(DIST)) {
    fs.mkdirSync(DIST);
}

// copy src files
fs.copyFileSync(path.join(SRC, "index.html"), path.join(DIST, "index.html"));
fs.copyFileSync(path.join(SRC, "style.css"), path.join(DIST, "style.css"));

// copy images folder recursively
const IMAGES_SRC = path.join(SRC, "images");
const IMAGES_DEST = path.join(DIST, "images");

function copyFolder(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyFolder(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyFolder(IMAGES_SRC, IMAGES_DEST);

// generate post history
let postLinks = "";

posts.forEach(post => {
    postLinks += `<li><a href="${post.slug}.html">${post.title}</a></li>`;
});

// update blog.html
const finalBlog = blogPage.replace("{{posts}}", postLinks);
fs.writeFileSync(path.join(DIST, "blog.html"), finalBlog);

// generate individual pages for posts
posts.forEach(post => {
    let finalPost = postTemplate
        .replace(/{{title}}/g, post.title)
        .replace("{{date}}", post.date)
        .replace("{{content}}", post.content);

    fs.writeFileSync(path.join(DIST, `${post.slug}.html`), finalPost);
});

console.log("site build successful");