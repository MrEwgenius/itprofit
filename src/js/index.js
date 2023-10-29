import Inputmask from 'inputmask';

import { modal } from "./modal.js"
import { inputsClear } from "./clearInputs.js"

let inputName = form.querySelector('.form-input-name')
let inputEmail = form.querySelector('.form-input-mail')
let inputPhone = form.querySelector('.form-input-phone')
let textAreaDescription = form.querySelector('.form-description')

import "../scss/index.scss";


let im = new Inputmask("+375 (99) 999-99-99");
im.mask(inputPhone);


form.addEventListener('reset', () => {
    clearErrorMessages()
})
form.addEventListener('submit', getData)


function getData(e) {
    e.preventDefault()

    const formData = {
        inputName: inputName.value,
        inputEmail: inputEmail.value,
        inputPhone: inputPhone.value,
        textareaDescription: textAreaDescription.value,
    };

    fetch('http://localhost:9090/api/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {

                clearErrorMessages()

                inputsClear([inputName])
                inputsClear([inputEmail])
                inputsClear([inputPhone])
                inputsClear([textAreaDescription])
                
                alert(data.message)

            } else if (data.status === 'error') {

                clearErrorMessages()

                if (data.fields) {
                    Object.keys(data.fields).forEach(fieldName => {
                        const errorLabel = document.querySelector(`#${fieldName}-error-label`);
                        errorLabel.textContent = data.fields[fieldName];

                        const inputField = document.querySelector(`[name="${fieldName}"]`);
                        inputField.classList.add('error-border');
                    });
                }
            }
        })
        .catch(error => console.error(error));


}
function clearErrorMessages() {

    const errorLabels = document.querySelectorAll('.error-lable');
    errorLabels.forEach(errorLabel => {
        errorLabel.textContent = '';
    });

    const errorBorder = document.querySelectorAll('.error-border');
    errorBorder.forEach(inputField => {
        inputField.classList.remove('error-border');
    });
}
