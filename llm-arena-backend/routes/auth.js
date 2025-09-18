const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',
    [
        body('firstName'),
        body('lastName'),
        body('email').isEmail(),
        body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: 'User already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({firstName, lastName, email, password: hashedPassword});
        await user.save();

        const payload ={ user: { id: user.id }};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({token})
    } catch(error) {
        console.error(error.message, res);
        res.status(500).send('Server error')
    }
  }
)

router.post('/login',
    async (req, res) => {
    try {
        const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    let user = await User.findOne({email});
    if(!user) return res.status(400).json({msg: 'Invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password) //compare user entered password with saved password
    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

    const payload = { user: { id: user.id } }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    res.json({ token });
    } catch(err) {
        console.error(err.message, res);
        res.status(500).send('Server error')
    }
}
)

module.exports = router;