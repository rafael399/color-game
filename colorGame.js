let numberOfSquares = 6;
let colors = [];
let pickedColor;
let bgColor = "#232323"
let h1BgColor = "steelblue"

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector(".colorDisplay");
let messageDisplay = document.getElementById("message");
let h1 = document.querySelector("h1");
let resetBtn = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

const successMessage = "Correct!";
const failMessage = "Try again!";
const playAgainMessage = "Play Again";
const newColorsMessage = "New Colors";

init();

function init(){
    resetBtn.addEventListener("click", () => reset());
    setModeButtons();
    setSquares();

    reset();
}

function setModeButtons(){
    modeButtons.forEach(mode => {
        mode.addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
            reset();
        });
    });
}

function setSquares(){
    squares.forEach((square, i) => {
        //add click listeners
        square.addEventListener("click", function(){
            //grab color of clicked square
            let clickedColor = this.style.backgroundColor;
    
            //compare color with pickedColor
            if (clickedColor === pickedColor){
                messageDisplay.textContent = successMessage;
                resetBtn.textContent = playAgainMessage;
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else {
                this.style.backgroundColor = bgColor;
                messageDisplay.textContent = failMessage;
            }
        });
    });
}

//Change square background colors
function changeColors(color){
    squares.forEach(square => {
        square.style.backgroundColor = color;
    });
}

function pickColor(){
    let number = Math.floor(Math.random() * colors.length);

    return colors[number];
}

function generateRandomColors(arraySize){
    //create an array
    let arr = [];

    //add num random colors to array
    for(var i = 0; i < arraySize; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }

    //return array
    return arr;

}

function randomColor(){
    //pick "red" from 0 to 255
    let r = Math.floor(Math.random() * 256);

    //pick "green" from 0 to 255
    let g = Math.floor(Math.random() * 256);

    //pick "blue" from 0 to 255
    let b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset(){
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetBtn.textContent = newColorsMessage;
    messageDisplay.textContent = "";

    squares.forEach((square, i) => {
        if(colors[i]){
            square.style.backgroundColor = colors[i];
            square.style.display = "block";
        } else
            square.style.display = "none";
    });

    h1.style.backgroundColor = h1BgColor;
}