const express = require('express');
const app = express();

const PORT = 3000;

function handleGetRequest(req, res) {
    res.send("Hello World!");
    //2 is success
    //3 is redirection
    //4 is client error
    //5 is server error
}

app.get('/', handleGetRequest)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
} )
