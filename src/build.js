const fs = require("fs");

// read posts data
const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

// read post template and blog page
const blogPage = fs.readFileSync("templates/t-blog.html", "utf-8");
const postTemplate = fs.readFileSync("templates/post.html", "utf-8");

// dist folder check
if (!fs.existsSync("../dist")) {
    fs.mkdirSync("../dist");
}

// copy src files
fs.copyFileSync("index.html", "../dist/index.html"); 
fs.copyFileSync("style.css", "../dist/style.css");
fs.cpSync("images", "../dist/images", { recursive: true });


// generate post history
let postLinks = "";

posts.forEach(post => {
    postLinks += `<li><a href="${post.slug}.html">${post.title}</a></li>`;
});

// update post history
const finalBlog = blogPage.replace("{{posts}}", postLinks);

// write blog.html
fs.writeFileSync("../dist/blog.html", finalBlog);

// generate individal pages for posts
posts.forEach(post => {
    let finalPost = postTemplate
    .replace(/{{title}}/g, post.title)
    .replace("{{date}}", post.date)
    .replace("{{content}}", post.content);

    fs.writeFileSync(`../dist/${post.slug}.html`, finalPost);
});

console.log("site build successful");