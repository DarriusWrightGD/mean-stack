var router = require('express').Router();
var User = require('../models/user');
var Message = require('../models/message');
var _ = require('lodash');
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    Message.find()
        .populate('user', 'firstName')
        .exec()
        .then(messages => {
            res.status(200).send(messages);
        })
        .catch(error => {
            res.status(500).send({
                title: 'An error occurred',
                error: error
            })
        })
})

router.use('/', (req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated Before',
                error: err
            });
        }
        next();
    })
})

router.patch('/:id', (req, res) => {
    Message.findById(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(500).send({
                    title: 'No Message found!',
                    error: { message: 'Message not found!' }
                })
            }

            message.content = req.body.content;
            message.save()
                .then(result => res.status(200).send(result))
                .catch(err => res.status(500).send({
                    title: 'An error occurred',
                    error: err
                }));
        })
        .catch(error => res.status(500).send({
            title: 'An error occurred message found!',
            error: error
        }))
})

router.post('/', (req, res) => {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id)
        .then((user) => {
            var body = _.pick(req.body, ['content']);
            body.user = user._id;
            new Message(body).save()
                .then(result => {
                    user.messages.push(result);
                    user.save();
                    result.populate('user', 'firstName', (err, doc) =>{
                        console.log('Doc:', JSON.stringify(doc))
                        res.status(201).send(doc);
                    });
                    // Message.populate(result, 'user', 'firstName').exec().then( );
                })
                .catch(err => res.status(500).send({
                    title: 'An error occurred',
                    error: err
                }));
        })
        .catch(err => res.status(500).send({
            title: 'An error occurred',
            error: err
        }));

});


router.delete('/:id', (req, res) => {
    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(500).send({
                    title: 'No Message found!',
                    error: { message: 'Message not found!' }
                })
            }

            // TODO: is one of the types different? !== doesn't work for some reason
            if (message.user != decoded.user._id) {
                return res.status(401).json({
                    title: 'Not Authenticated Here',
                    error: {message : 'User\'s don\'t match'}
                });
            }
            message.content = req.body.content;
            message.remove()
                .then(result => res.status(200).send(result))
                .catch(err => res.status(500).send({
                    title: 'An error occurred',
                    error: err
                }));
        })
        .catch(error => res.status(500).send({
            title: 'An error occurred message found!',
            error: error
        }))
})

module.exports = router;