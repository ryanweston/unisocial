const express = require('express');
const router = express.Router();
const University = require('../../models/University');
const universityList = require('../../universities.json');


// @route    POST api/users
// @desc     Register User
// @access   Public

router.post('/', async (req, res) => { 
    try {
        for (i = 0; i < universityList.length; i++){
           let obj = universityList[i]; 

           let name = obj.name.split(',', 1)[0];
           let domain = obj.web_pages[0];
           let country = obj.country;

            const university = new University ({
            name, 
            domain,
            country,
            })

           await university.save();   
        } 

        res.json({ msg: 'Objects successfully saved to database' })

    } catch (err) {
       console.log(err.message);
       res.status(400).send('JSON data to database failed');
    }
});

module.exports = router;