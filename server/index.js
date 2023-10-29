const express = require("express");
const cors = require("cors");
const app = express();


function isValidEmail(email) {
    return /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(email);
}
function isValidPhone(Phone) {
    return /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(Phone)
}

const bodyParser = require('body-parser');
const port = 9090;


app.use(cors());
app.use(bodyParser.json());
app.post("/api/registration", (req, res) => {

    const formData = req.body;
    const errors = {};

    !formData.inputName ? errors.inputName = "Имя обязательно для заполнения" : null
    !isValidEmail(formData.inputEmail) ? errors.inputEmail = "Email введён неверно или отсутствует" : null
    !isValidPhone(formData.inputPhone) ? errors.inputPhone = "Номер телефона введёт не корректно или отсутствует" : null
    !formData.textareaDescription ? errors.textareaDescription = "Сообщение обязательно для заполнения" : null

    if (Object.keys(errors).length > 0) {
        res.status(400).json({
            status: "error",
            fields: errors,
        });
    } else {
        res.status(200).json({
            status: "success",
            message: "Ваша заявка успешно отправлена",
        });
    }
});

app.get("/api/ping", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is ready",
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));