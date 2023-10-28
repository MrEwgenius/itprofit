const express = require("express");
const cors = require("cors");
const app = express();

function isValidEmail(email) {
    return /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(email);
}

const bodyParser = require('body-parser'); // Подключаем библиотеку для разбора данных из запроса

const port = 9090;


app.use(cors());
app.use(bodyParser.json());

app.post("/api/registration", (req, res) => {
    const formData = req.body;
    const errors = {};

    if (!formData.inputName) {
        errors.inputName = "Имя обязательно для заполнения";
    }

    if (!isValidEmail(formData.inputEmail)) {
        errors.inputEmail = "Email обязателен для заполнения";
    }

    if (!formData.inputPhone) {
        errors.inputPhone = "Телефон обязателен для заполнения";
    }

    if (!formData.textareaDescription) {
        errors.textareaDescription = "Сообщение обязательно для заполнения";
    }

    if (Object.keys(errors).length > 0) {
        res.status(400).json({
            status: "error",
            fields: errors,
        });
    } else {
        res.status(200).json({
            status: "success",
            message: "You are registered",
        });
    }
});

app.get("/api/ping", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is ready",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});