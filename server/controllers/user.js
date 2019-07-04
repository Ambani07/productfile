const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');


exports.auth = function(req, res){
    const {email, password} = req.body;

    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password'}]});
    }

    User.findOne({email}, function(err, user){
        //return errors from DB
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        //return error if user is not found
        if(!user){
            return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'User does not exist'}]});
        }

        //check if password provided matched the one from DB
        if(user.hasSamePassword(password)){
            //return JsonWebToken
            const token = jwt.sign({
                userId : user.id,
                username : user.username
              }, config.SECRET, { expiresIn: '1h' });
              //return token to be stored on the client side
              return res.json(token);
        }else{
            return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Incorrect email or password!'}]});
        }
    });

}

exports.register = function(req, res){
    //get user input from using body parser
    const {username, role, email, password, passwordConfirmation} = req.body;

    if(!username || !email){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not the same as confirmation!'}]});
    }

    if(!role){
        return res.status(422).send({errors: [{title: 'User role', detail: 'User role is required'}]});
    }

    //check if user exist
    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({'mongoose': 'handle mongoose errors in next lecture'});
        }

        if(existingUser){
            return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'This email already exist'}]});
        }

        //create user
        const user = new User({
            username,
            role,
            email,
            password
        });

        //save user to database
        user.save(function(err){
            
            if(err){
                return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
            }

            return res.json({"registered": true});
        });
        
    });
}

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if(token){
        const user = parseToken(token);

        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)});
            }

            if(user){
                res.locals.user = user;
                next();
            }else{
                return notAuthorized(res);
            }
        });
    }else{
        return notAuthorized(res);
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res){
    return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
}