var router = require('express').Router();
var User = require('../models/user');
var Message = require('../models/message');
var _ = require('lodash');

router.patch('/:id', (req, res) =>{
    Message.findById(req.params.id)
        .then(message =>{
            if(!message) {
                return res.status(500).send({
                    title: 'No Message found!',
                    error: { message: 'Message not found!'}
                })
            }

            message.content = req.body.content;
            message.save()
                .then(result => res.status(200).send(result))
                .catch( err => res.status(500).send({
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
    var body = _.pick(req.body, ['content']);

    new Message(body).save()
        .then( result => res.status(201).send(result))
        .catch( err => res.status(500).send({
            title: 'An error occurred',
            error: err
        }));
});

router.get('/', (req, res)=>{
    Message.find()
        .exec()
        .then( messages => {
            res.status(200).send(messages);
        })
        .catch( error => {
            res.status(500).send({
                title: 'An error occurred',
                error: error
            })
        })
})

router.delete('/:id', (req, res)=>{
    Message.findById(req.params.id)
    .then(message =>{
        if(!message) {
            return res.status(500).send({
                title: 'No Message found!',
                error: { message: 'Message not found!'}
            })
        }

        message.content = req.body.content;
        message.remove()
            .then(result => res.status(200).send(result))
            .catch( err => res.status(500).send({
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