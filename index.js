const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./database/dbConnection');
const User = require('./database/user');
const bodyParser = require('body-parser');
const cors = require('cors');

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enable cors
app.use(cors());

// for login

app.post('/', async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) {
            return res.status(401).json({error: 'Invalid Username or password'})
        }
        if(user.password != password) {
            return res.status(200).json({error: 'Invalid password'});
        }
        res.status(200).json({message: 'Login Successful'});
    }
    catch(error) {
        res.status(500).json({error:'Login Failed'});
    }
})

// Signup
app.post('/signup', async(req, res) => {
    try {
        const {username, password} = req.body;
        console.log(req.body);
        
        const user = new User({username, password});
        await user.save();

        res.status(201).json({message: 'Registration successful'});
    }
    catch(error) {
        res.status(500).json({error: 'Registration failed'});
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectDB();
} )
