
const button = document.getElementById("changeBtn");
const colorCode = document.getElementById("colorCode");

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        color += letters[randomIndex];
    }

    return color;
}

function change() {
    const randomColor = generateRandomColor();
    
    document.body.style.backgroundColor = randomColor;
    colorCode.textContent = "Current Color: " + randomColor;
}

button.addEventListener("click", change);
