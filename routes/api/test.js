const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = 'ryan.ede@students.plymouth.ac.uk';
        const university = 'http://www.plymouth.ac.uk';

        //Removes headers from domain names of universities, 
        //and returns a boolean if the given email ends with the 
        //selected universities domain.
        const emailVerify = (email, domain) => {
            const regex = /^(https?|ftp):\/\/www./;
            const unidomain = domain.replace(regex, '');
            console.log(unidomain);
            const statement = email.endsWith(unidomain);
            console.log(statement);
            return statement;
        }

        emailVerify(user, university);

    } catch (err) {
        res.status(400).json({ msg: 'Server failed' });
    }
})

module.exports = router;