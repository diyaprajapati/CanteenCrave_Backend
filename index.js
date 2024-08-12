const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./database/dbConnection');
const User = require('./database/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enable cors
app.use(cors());

// Login endpoint
app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Email or Password' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        res.status(200).json({ message: 'Login Successful' });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ error: 'Login Failed due to server error' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the incoming request body
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log('Email already exists');
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        console.log('User registered successfully');
        res.status(201).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Registration Error:', error); // Log the error details
        res.status(500).json({ error: 'Registration failed' });
    }
});



(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
})();
