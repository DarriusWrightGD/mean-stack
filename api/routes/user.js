var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var _ = require('lodash')

router.post('/', async (req, res) => {
    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
    body.password = bcrypt.hashSync(body.password, 10);
    var user = new User(body);
    try {
        res.status(201).send(await user.save());
    } catch (error) {
        res.status(500).send({
            title: 'An error occurred',
            error: error
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
        let foundUser = await User.findOne(
            { email: req.body.email },
        );

        if (!foundUser) {
            return res.status(500).send({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            })
        }

        let compareResult = await bcrypt.compare(req.body.password, foundUser.password);

        if (!compareResult) {
            return res.status(500).send({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            })
        }

        var u = _.omit(foundUser.toObject(), ['password', 'messages', '__v']);
        console.log(JSON.stringify(u, null, 2));
        var token = jwt.sign({ user: u}, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in.',
            token: token,
            userId: foundUser._id
        })
    } catch (error) {
        res.status(500).send({
            title: 'An error occurred',
            error: error.message
        });
    }
});


module.exports = router;
