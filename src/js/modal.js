let modal = document.querySelector('.modal')
let buttonOpen = document.querySelector('.modal-open')
let buttonClose = document.querySelector('.modal-close')

export function disableScroll() {
    document.body.classList.toggle('noscroll')
}

 function popupFormToggle() {
    modal.classList.toggle('modal-active')
    disableScroll()

}
buttonOpen.addEventListener('click', popupFormToggle)
buttonClose.addEventListener('click', popupFormToggle)