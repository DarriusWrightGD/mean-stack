var router = require('express').Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

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


module.exports = router;