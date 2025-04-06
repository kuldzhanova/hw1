//GMAIL CHECKER
const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^\w+@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK";
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML =  'ERROR';
        gmailResult.style.color = "red"
    }
}

// MOVE BLOCK

// const block = document.querySelector(".child_block");
// block.style.left = '0px';
// let move = 0;
// const count = () => {
//     move++;
//     block.style.left = move + 'px';
//
//     if (move < 448) {
//         requestAnimationFrame(count)
//     }
//
// }
// count()

const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

let positionX = 0, positionY = 0;
const maxWidth = parentBlock.clientWidth - childBlock.clientWidth;
const maxHeight = parentBlock.clientHeight - childBlock.clientHeight;

const moveBlock = () => {
    if (positionX < maxWidth && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX >= maxWidth && positionY < maxHeight) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
    } else if (positionY >= maxHeight && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
    }

    requestAnimationFrame(moveBlock);
};

moveBlock();

// HOMEWORK 2
const counter = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
let count = 0
let interval = null;

const newInterval = () => {
    counter.innerHTML = count;
};
newInterval();

startBtn.onclick = () => {
    if (interval === null) {
        interval = setInterval(() => {
            count++;
            newInterval(); // обновляем экран каждую секунду
        }, 1000);
    }
}

stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
}

resetBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    count = 0
    newInterval();
}