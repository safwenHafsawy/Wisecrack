const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req,  res ,next) => {
    User.findOne({email : req.body.email}, (err,email) => {
        if(err){
            res.status(500).json({ error : err })
        }
        if(email !== null){
            res.status(401).json({ message :'email already in use ! '})
        }
            bcrypt.hash(req.body.password,12).then(
                (hash) => {
                    const user = new User({
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        password : hash
                    });
            user.save().then(
                () => {
                    res.status(201).json({ message : 'account created successfully ! '});
                }
            ).catch(
                (error) => {
                    res.status(500).json({ error : error });
                });
            });
    });
}
            

    


exports.login = (req, res, next) => {
    User.findOne({ email : req.body.email}).then(
        (user) => {
            if(!user){
                return(
                    res.status(404).json({error : new Error('user not found !')})
                )
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if(!valid) {
                        return(
                            res.status(401).json({error : new Error('password did not match ! ')})
                        )
                    }                    
                    const token = jwt.sign(
                        { user : user._id },
                        process.env.SECRET,
                    )
                    res.status(200).json({
                        user: user._id,
                        token : token
                    })
                }).catch(
                    (error) => {
                        res.status(500).json({ error : error})
                    }
                );
        }).catch(
            (error) => {
                res.status(500).json({ error : error})
            }
        ) 
        }           
