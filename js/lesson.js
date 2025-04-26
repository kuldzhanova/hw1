//PHONE CHECKER
const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK";
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = "ERROR";
        phoneResult.style.color = "red";
    }
}
// convertor
const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const euroInput = document.querySelector("#eur");


const convertor = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/convertor.json");
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.responseText);
            const value = parseFloat(element.value);

            if (isNaN(value)) {
                somInput.value = "";
                usdInput.value = "";
                euroInput.value = "";
                return;
            }

            if (element === somInput) {
                usdInput.value = (value / data.usd).toFixed(2);
                euroInput.value = (value / data.euro).toFixed(2);
            }

            if (element === usdInput) {
                const som = value * data.usd;
                somInput.value = som.toFixed(2);
                euroInput.value = (som / data.euro).toFixed(2);
            }

            if (element === euroInput) {
                const som = value * data.euro;
                somInput.value = som.toFixed(2);
                usdInput.value = (som / data.usd).toFixed(2);
            }
        };
    };
};

convertor(somInput, usdInput);
convertor(usdInput, somInput);
convertor(euroInput, somInput);

// tab slider
const TabBlocks = document.querySelectorAll('.tab_content_block')
const ItemBlocks = document.querySelectorAll('.tab_content_item')
const button = document.querySelector('.tab_content_items')
const hideFunction = () => {
    TabBlocks.forEach(item => {
    item.style.display = 'none';
    })
    ItemBlocks.forEach(item => {
        item.classList.remove('tab_content_item_active');
    })
};

const showFunction = (index = 0) => {
    TabBlocks[index].style.display = 'block';
    ItemBlocks[index].classList.add('tab_content_item_active');
}
hideFunction()
showFunction()

button.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        ItemBlocks.forEach((item, index) => {
            if (event.target === item) {
                hideFunction();
                showFunction(index);
            }
        });
    }
};

let currentIndex = 0;
let autoPlayInterval;
const itemCount = ItemBlocks.length;

function Slide(index) {
    if (index < 0) {
        index = itemCount - 1;
    } else if (index >= itemCount) {
        index = 0;
    }
    hideFunction();
    showFunction(index);
    currentIndex = index;
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        Slide(currentIndex + 1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

startAutoPlay();

// card switcher
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const cardBlock = document.querySelector(".card");

let cardId = 1;

const Card = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then((res) => res.json())
        .then((data) => {
            cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p style="color:${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
      `;
        })
        .catch((err) => {
            cardBlock.innerHTML = `<p>Ошибка: ${err.message}</p>`;
        });
};

btnNext.onclick = () => {
    cardId = cardId === 200 ? 1 : cardId + 1;
    Card(cardId);
};


btnPrev.onclick = () => {
    cardId = cardId === 1 ? 200 : cardId - 1;
    Card(cardId);
};

Card(cardId);

// 2
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
        console.log( posts);
    })
    .catch(err => {
        console.error('Ошибка:', err);
    });
