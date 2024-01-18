const express = require("express");
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", (req, res) => {
    console.log("GET / working");
    return res.send("Server App is running");
});

app.get("/get-form", (req, res) => {
    return res.send(`
    <html>
        <body>
            <h1>User Form</h1>
            <form action='/api/form_submit' method="POST">
                <label for="name">Name</label>
                <input type='text' id='name' name="name"/>
                <br/>
                
                <label for="email">Email</label>
                <input type='text' id='email' name="email"/>
                <br/>
                
                <label for="password">Password</label>
                <input type='password' id="password" name="password"/>
                <br/>

                <button type='submit'>Submit</button>
            <form/>
        <body/>
      <html/>
    `);
});

app.get("/api/form_submit", (req, res) => {
    console.log(req.body);
    return res.send("Form submitted successfully");
});

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});