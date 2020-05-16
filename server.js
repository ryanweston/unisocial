const connectDB = require('./config/db');
const express = require('express');
const app = express();
const path = require('path');

// Connect Database
connectDB();

// Middleware (body-parser packaged in express), that formats req.body from post requests to json
// .JSON(): Parses incoming request object as JSON
app.use(express.json());
// .URLENCODED: If strings or arrays as request object, parses them
app.use(express.urlencoded({ extended: false }));

//Define Routes, allows cleaner infrastructure of files & relative schemas
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/dashboard', require('./routes/api/dashboard'));
app.use('/api/reviews', require('./routes/api/reviews'));
app.use('/api/university', require('./routes/api/university'));
app.use('/api/test', require('./routes/api/test'));


// React serves static files post build. It is currently set to run build after being pushed to Heroku,
// therefore when application is production state/has finished building, we have to both  set the folder in which 
// the static files will be served from, as well as set the static index file that is created as our application entry point after build.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__direname, 'client', 'build', 'index.html'));
  })
}

//5000 is dev port, process.env.port is used by heroku for deployment
const PORT = process.env.PORT || 5000;

// Listening for requests on port variable
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
