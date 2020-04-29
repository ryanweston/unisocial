const connectDB = require('./config/db');
const express = require('express');

const app = express();

// Connect Database
connectDB();

// init Middleware (express-validator)
app.use(express.json({ extended: false }));

//Define Routes, allows cleaner infrastructure of files & relative schemas
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/reviews', require('./routes/api/reviews'));
app.use('/api/university', require('./routes/api/university'));

//3000 is dev port, process.env.port is used by heroku for deployment
const PORT = process.env.PORT || 5000;

// Listening for requests on port variable
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
