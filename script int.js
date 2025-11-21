// ====== Slider الأساسي ======
const slides = document.querySelector(".slides");
const slideCount = document.querySelectorAll(".slide").length;
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

const updateSlider = () => {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
};

document.getElementById("next").onclick = () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
};

document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
};

function a(b) { document.querySelector(".menu").classList.add("a") }

dots.forEach((dot, i) => {
    dot.onclick = () => {
        currentIndex = i;
        updateSlider();
    };
});

// ====== وضع العرض الكامل ======
const fullView = document.getElementById("fullscreen-view");
const fullImg = document.getElementById("fullscreen-img");
const openables = document.querySelectorAll(".open-full");
const fsPrev = document.getElementById("fs-prev");
const fsNext = document.getElementById("fs-next");
const fsClose = document.querySelector(".fullscreen .close");
let fsIndex = 0;

const openFullscreen = (index) => {
    fsIndex = index;
    fullImg.src = openables[index].src;
    fullView.classList.remove("hidden");
};

const updateFullscreen = (dir) => {
    fsIndex = (fsIndex + dir + openables.length) % openables.length;
    fullImg.src = openables[fsIndex].src;
};

openables.forEach((img, i) => {
    img.addEventListener("click", () => openFullscreen(i));
});

fsPrev.onclick = () => updateFullscreen(-1);
fsNext.onclick = () => updateFullscreen(1);

// ⛔️ طرق الإغلاق المتعددة
fsClose.onclick = () => fullView.classList.add("hidden");
fullImg.onclick = () => fullView.classList.add("hidden");
fullView.addEventListener("click", (e) => {
    if (e.target === fullView) fullView.classList.add("hidden");
});

// التنقل بلوحة المفاتيح
document.addEventListener("keydown", (e) => {
    if (fullView.classList.contains("hidden")) return;
    if (e.key === "ArrowLeft") updateFullscreen(-1);
    if (e.key === "ArrowRight") updateFullscreen(1);
    if (e.key === "Escape") fullView.classList.add("hidden");
});