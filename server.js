const connectDB = require('./config/db');
const express = require('express');

const app = express();

// Connect Database
connectDB();

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/reviews', require('./routes/api/reviews'));

const PORT = process.env.PORT || 3000;

// Listening for requests on port variable
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
