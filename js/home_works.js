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

// part 2
const block = document.querySelector(".child_block");
block.style.left = '0px';
let move = 0;
const count = () => {
    move++;
    block.style.left = move + 'px';

    if (move < 448) {
        requestAnimationFrame(count)
    }

}
count()