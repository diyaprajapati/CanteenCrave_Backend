const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./')

function handleGetRequest(req, res) {
    res.send("Hello World!");
}

app.get('/', handleGetRequest)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
} )
