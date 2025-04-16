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