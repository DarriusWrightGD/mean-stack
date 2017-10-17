var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var _ = require('lodash')

router.post('/', (req, res)=>{
    var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'password']);
    body.password = bcrypt.hashSync(body.password, 10);
    var user = new User(body);
    user.save()
        .then( result => res.status(201).send(result))
        .catch( error => res.status(500).send({
            title: 'An error occurred',
            error: error
        }));
});

router.post('/signin', (req, res)=>{
    User.findOne({email: req.body.email})
        .then( foundUser => {
            if(!foundUser) {
                return res.status(500).send({
                    title: 'Login failed',
                    error: {message: 'Invalid login credentials'}
                })
            }

            bcrypt.compare(req.body.password, foundUser.password)
                .then( result => {
                    if(!result) {
                        return res.status(500).send({
                            title: 'Login failed',
                            error: {message: 'Invalid login credentials'}
                        })
                    }

                    var token = jwt.sign({user: foundUser}, 'secret', { expiresIn: 7200 });
                    res.status(200).json({
                        message: 'Successfully logged in.',
                        token: token,
                        userId: foundUser._id
                    })
                });
        })
        .catch( error => res.status(500).send({
            title: 'An error occurred',
            error: error
        }));
});


module.exports = router;