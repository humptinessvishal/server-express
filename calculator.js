const express = require("express");
const app = express();
const port = 8001;

app.use(express.json());

app.get("/", (req, res) => {
    console.log("GET / workinga");
    return res.send("Cal app is running");
});

// Add
app.post("/add", (req, res) => {
    console.log(req.body);
    const { num1, num2 } = req.body;

    //data validation
    if (!num1 || !num2) {
        return res.send(`Data is missing: num1 = ${num1}, num2 = ${num2}`);
    }

    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return res.send("Data types of numbers are incorrect");
    }

    const result = num1 + num2;

    return res.send({
        status: 200,
        message: "Addition is successfull",
        result: result,
    });
});

// Subtract with query
app.get("/sub", (req, res) => {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
        return res.send({ error: `Data is missing: num1 = ${num1}, num2 = ${num2}` });
    }

    // Convert the values to numbers
    const operand1 = Number(num1);
    const operand2 = Number(num2);

    // Check if the conversion was successful
    if (isNaN(operand1) || isNaN(operand2)) {
        return res.send({ error: `Invalid number format: num1 = ${num1}, num2 = ${num2}` });
    }

    // Perform subtraction
    const result = operand1 - operand2;

    return res.send({
        status: 200,
        message: "Subtraction is successfull",
        result: result,
    });
});

//Multiply with dynamic routes with params
app.get("/multi/:id1/:id2", (req, res) => {
    console.log(req.params);
    const { id1, id2 } = req.params;

    if (!id1 || !id2) {
        return res.send({ error: `Data is missing: num1 = ${id1}, num2 = ${id2}` });
    }

    // Check if the conversion was successful
    if (isNaN(id1) || isNaN(id2)) {
        return res.send({ error: `Invalid number format: num1 = ${id1}, num2 = ${id2}` });
    }

    // Convert the values to numbers
    const operand1 = Number(id1);
    const operand2 = Number(id2);

    // Perform subtraction
    const result = operand1 * operand2;

    return res.send({
        status: 200,
        message: "Multiplication is successfull",
        result: result,
    });
});

//Divison with dynamic routes with params
app.get("/div/:num/:den", (req, res) => {
    console.log(req.params);
    const { num, den } = req.params;

    if (!num || !den) {
        return res.send(`Data is missing: num1 = ${num}, num2 = ${den}`);
    }

    if (isNaN(num) || isNaN(den)) {
        return res.send({ error: `Invalid number format: num1 = ${num}, num2 = ${den}` });
    }

    if (den === "0") {
        return res.send({ error: "Denominator can not be zero" });
    }

    const result = parseInt(num) / parseInt(den);
    console.log(`${num}, ${den}`)

    return res.send({
        status: 200,
        message: "Div success",
        result: result,
    });
});

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});