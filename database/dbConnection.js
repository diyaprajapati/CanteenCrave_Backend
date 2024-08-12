const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/CanteenCrave', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log('DB Connection Error:', error);
        throw error; // Re-throw to be caught in the server startup
    }
}

module.exports = connectDB;