import "../scss/index.scss";
import { validateInputName, validateInputEmail, validateInputPhone, validateDescription } from "./just-validate.js"
import { inputsClear } from "./clearInputs.js"
let inputName = form.querySelector('.form-input-name')
let inputEmail = form.querySelector('.form-input-mail')
let inputPhone = form.querySelector('.form-input-phone')
let textAreaDescription = form.querySelector('.form-description')
// let forms = document.querySelector('.form')

let btnCancel = document.querySelector('.form-cancel')
import { createError } from "./createError.js"

import { removeError } from "./removeError.js"

form.addEventListener('reset', () => {
    clearErrorMessages()
    console.log(1);
})
form.addEventListener('submit', getData)
// inputName.addEventListener('keyup', validateInputName)
// inputEmail.addEventListener('keyup', validateInputEmail)
// inputPhone.addEventListener('keyup', validateInputPhone)
// textAreaDescription.addEventListener('keyup', validateDescription)

function getData(e) {
    e.preventDefault()

    // if (validateInputName() && validateInputEmail() && validateInputPhone() && validateDescription()) {


    const formData = {
        inputName: inputName.value,
        inputEmail: inputEmail.value,
        inputPhone: inputPhone.value,
        textareaDescription: textAreaDescription.value,
    };

    // Отправляем данные на сервер с использованием fetch.
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

            } else if (data.status === 'error') {
                clearErrorMessages()


                if (data.fields) {
                    Object.keys(data.fields).forEach(fieldName => {
                        const errorLabel = document.querySelector(`#${fieldName}-error-label`); // Обратите внимание на измененный идентификатор
                        errorLabel.textContent = data.fields[fieldName];
                        const inputField = document.querySelector(`[name="${fieldName}"]`);
                        inputField.classList.add('error-border');
                    });
                }
            }
        })
        .catch(error => {
            // Обработка ошибок сети.
            console.error(error);
        });


    // }
}
function clearErrorMessages() {
    const errorLabels = document.querySelectorAll('.error-lable');
    errorLabels.forEach(errorLabel => {
        errorLabel.textContent = ''; // Очищаем текст сообщений об ошибках
    });

    const errorInputFields = document.querySelectorAll('.error-border');
    errorInputFields.forEach(inputField => {
        inputField.classList.remove('error-border'); // Убираем стили с полей
    });
}
function clearForm() {
    // Очистите значения полей формы.
    form.reset();

}