var express = require('express');
var app = express();

app.get('/', (req, res)=>{ 
    res.send('hello user!');
});

//Listening for requests on port 3000
app.listen(3000, ()=> {
    console.log('Server listening on port 3000');
});