import { createError } from "./createError.js"
import { removeError } from "./removeError.js"
import Inputmask from 'inputmask';

let inputName = form.querySelector('.form-input-name')
let inputEmail = form.querySelector('.form-input-mail')
let textAreaDescription = form.querySelector('.form-description')
let inputPhone = form.querySelector('.form-input-phone')
let im = new Inputmask("+375 (99) 999-99-99");
im.mask(inputPhone);

export function validateInputName() {
    // removeError(inputName)
    if (symbolChek(inputName) && maxMinLengthCheck(inputName, 25, 2)) {

        return true


    } else {
        return false
    }

}
export function validateInputEmail() {
    // removeError(inputEmail)
    // if (symbolChekEmail(inputEmail)) {

        return true


    // } else {
    //     return false
    // }

}

export function validateInputPhone() {
    // if (/^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(inputPhone.value) && inputPhone.value.length === 19) {
    //     removeError(inputPhone)

        return true
    // } else {
    //     createError(inputPhone, 'Номер введён некорректно ')
    //     return false
    // }
}
export function validateDescription() {

    // if ( maxMinLengthCheck(textAreaDescription, 131, 2)) {
    //     symbolChek(textAreaDescription)
    //     maxMinLengthCheck(textAreaDescription, 12, 2)

        return true
    // } else {
    //     return false
    // }

}


export function symbolChek(input) {

    if (!/[!@#$%^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.value)) {

        return true

    } else {
        removeError(input)
        createError(input, 'Можно использовать только:  _  . ( )  символы.')

        return false

    }

}
export function symbolChekEmail(input) {

    if (/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(input.value)) {

        return true

    } else {
        removeError(input)
        createError(input, 'Email введён некорректно ')

        return false

    }

}






export function maxMinLengthCheck(input, mLen, minLen) {
    removeError(input)

    if (input.value.length > mLen) {
        removeError(input)
        createError(input, `Максимальное колличество знаков: ${mLen}`)
        return false

    }
    else if (minLen > input.value.length) {
        removeError(input)

        createError(input, `Минимальное колличество знаков: ${minLen}`)
        return false



    } else {
        return true

    }
}