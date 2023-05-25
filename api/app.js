require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")


app.use(express.json())
app.use(cors())

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    res.json({ firstName, lastName, email, password });
});

app.get('/test', (req, res) => {
    res.json('ok')
})

module.exports = app;
