const lazyLoadItems = document.querySelectorAll(".lazy-item");

const all_lazy = () => {
  setTimeout(() => {
    lazyLoadItems.forEach((el) => {
      el.setAttribute("src", el.getAttribute("data-src"));
    });
  }, 4100);
};

window.addEventListener("load", all_lazy, { once: true });

const images = document.querySelectorAll("img");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

function handleImg(myImg, observer) {
  myImg.forEach((myImgSingle) => {
    if (myImgSingle.intersectionRatio > 0) {
      loadImage(myImgSingle.target);
    }
  });
}

function loadImage(image) {
  image.src = image.getAttribute("data-src");
  observer.unobserve(image);
}
const observer = new IntersectionObserver(handleImg, options);
images.forEach((img) => {
  observer.observe(img);
});
