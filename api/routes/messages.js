var router = require('express').Router();
var User = require('../models/user');
var Message = require('../models/message');
var _ = require('lodash');
var jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        let messages = await Message.find()
            .populate('user', 'firstName')
            .exec();
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({
            title: 'An error occurred',
            error: error
        })
    }
});


router.use((req, res, next) => {
    jwt.verify(req.query.token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).send({
                title: 'Not Authenticated Before',
                error: err
            });
        }
        next();
    })
})

router.patch('/:id', async (req, res) => {
    try {
        let message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(500).send({
                title: 'No Message found!',
                error: { message: 'Message not found!' }
            })
        }

        message.content = req.body.content;
        res.status(200).send(await message.save())
    } catch (err) {
        res.status(500).send({
            title: 'An error occurred',
            error: err
        })
    }
})

router.post('/', async (req, res) => {
    let decoded = jwt.decode(req.query.token);
    let body = _.pick(req.body, ['content']);

    try {
        let user = await User.findById(decoded.user._id);
        body.user = user._id;
        let result = await new Message(body).save();

        user.messages.push(result);
        user.save();
        result.populate('user', 'firstName', (err, doc) => {
            console.log('Doc:', JSON.stringify(doc))
            res.status(201).send(doc);
        });
    } catch (err) {
        res.status(500).send({
            title: 'An error occurred',
            error: err
        });
    }
});


router.delete('/:id', async (req, res) => {
    var decoded = jwt.decode(req.query.token);

    let message;
    
    try {
        message = Message.findById(req.params.id)        
    }catch(error) {
        return res.status(500).send({
            title: 'An error occurred, no message found!',
            error: error
        });
    }
    
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
            error: { message: 'User\'s don\'t match' }
        });
    }
        
    message.content = req.body.content;

    try {
        res.status(200).send(await message.remove())
    }catch(err){
        return res.status(500).send({
            title: 'An error occurred',
            error: err
        });
    }
})

module.exports = router;