const tabs = document.querySelectorAll(".art-tab-links");
const contents = document.querySelectorAll(".art-tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");

        const content = document.getElementById(target);
        if (content) content.classList.add("active");

    });
});