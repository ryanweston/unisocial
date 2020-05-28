const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//Fixes depracation warning
mongoose.set('useCreateIndex', true);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            //Allows use of findByIdAndUpdate
            useFindAndModify: false
        });

        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure if error
        process.exit(1);
    }
};

module.exports = connectDB;