const express = require('express');
const router = express.Router();
const University = require('../../models/University');
const universityList = require('../../universities.json');


// @route    POST api/university
// @desc     fills database with university data, run only once before ship!
// @access   Public (need to be private)

router.post('/', async (req, res) => {
    try {
        for (i = 0; i < universityList.length; i++) {
            let obj = universityList[i];

            let name = obj.name.split(',', 1)[0];
            let domain = obj.web_pages[0];
            let country = obj.country;

            const university = new University({
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

// @route    GET api/university
// @desc     Returns university names
// @access   Public

router.get('/', async (req, res) => {
    try {
        // sorts universities by name alphabetically, primarily for use in registration and editing profile
        const list = await University.find({}).select('name').sort({ name: 1 });
        res.json({ list });
    } catch (err) {
        console.log(err.message);
        res.status(400).send('University list query failed');
    }
})

module.exports = router;