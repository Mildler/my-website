const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");

const prev = document.querySelector(".lightbox-prev");
const next = document.querySelector(".lightbox-next");

let currentIndex = 0;
let currentImages = [];

function showImage(index) {

    const img = currentImages[index];

    lightboxImg.src = img.src;
    caption.textContent = img.dataset.caption;

    currentIndex = index;

    updateArrows();
}

function updateArrows(){

    prev.style.display = currentIndex === 0 ? "none" : "block";
    next.style.display = currentIndex === currentImages.length - 1 ? "none" : "block";

}

document.querySelectorAll(".art-tab-content img").forEach((img, index)=>{

    img.addEventListener("click", ()=>{

        const tab = img.closest(".art-tab-content");
        currentImages = Array.from(tab.querySelectorAll("img"));
        currentIndex = currentImages.indexOf(img);
        lightbox.style.display = "flex";
        showImage(currentIndex);

    });

});

next.onclick = () => {
    if (currentIndex < currentImages.length - 1){
        showImage(currentIndex + 1);
    }
};

prev.onclick = () => {
    if (currentIndex > 0){
        showImage(currentIndex - 1);
    }
};

lightbox.onclick = (e) => {
    if (e.target === lightbox){
        lightbox.style.display = "none";
    }
};

document.addEventListener("keydown", (e) => {

    if (lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") {
        if (currentIndex < currentImages.length - 1) {
            showImage(currentIndex + 1);
        }
    }

    if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    }

    if (e.key === "Escape") {
        lightbox.style.display = "none";
    }

});