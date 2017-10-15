var router = require('express').Router();
var User = require('../../models/user');

router.get('/', (req, res)=>{
    User.findOne({})
        .then((doc)=>{
            res.send(doc);
        })
        .catch(()=> res.sendStatus(500));        
});

router.post('/', (req, res)=>{
    var email = req.body.email;
    var user = new User({
        firstName: 'Darrius',
        lastName: 'Wright',
        password: 'password',
        email: email
    });

    user.save()
        .then(()=>res.sendStatus(200))
        .catch(()=> res.sendStatus(500));
});

module.exports = router;