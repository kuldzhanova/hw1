const modalOpenButton = document.querySelector("#btn-get");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal_close");

const openModal = () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
}
modalOpenButton.onclick =openModal;
modalCloseButton.onclick =closeModal;
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}

function Scroll() {
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', Scroll);
    }
}

window.addEventListener('scroll', Scroll);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(openModal, 10000);
});
