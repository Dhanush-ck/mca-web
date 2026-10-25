
const content = document.getElementById("content");
const image = document.getElementById("image");
const heading = document.getElementById("heading");
const alternateHeading = document.getElementById("alternateHeading");

const originalImage =
    "./assets/img/original-image.svg";

const hoverImage =
    "./assets/img/hovered.svg";

content.addEventListener("mouseover", function () {
    image.src = hoverImage;
    heading.hidden = true;
    alternateHeading.hidden = false;
});

content.addEventListener("mouseout", function () {
    image.src = originalImage;
    heading.hidden = false;
    alternateHeading.hidden = true;
});
