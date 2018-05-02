var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var chat = require('../controller/chat');

/* GET home page. */
router.get('/',function(req, res){
    res.redirect('/chat/1');
});
router.get('/1', chat.d1);
router.get('/2', isLoggedIn, chat.d2);
router.post('/2', isLoggedIn, chat.d2);
router.get('/3', isLoggedIn, chat.d3);
router.post('/3', isLoggedIn, chat.d3);
router.get('/4', isLoggedIn, chat.d4);
router.post('/4', isLoggedIn, chat.d4);
router.get('/5', isLoggedIn, chat.d5);
router.post('/5', isLoggedIn, chat.d5);
router.get('/6', isLoggedIn, chat.d6);
router.post('/6', isLoggedIn, chat.d6);
router.get('/7', isLoggedIn, chat.d7);
router.post('/7', isLoggedIn, chat.d7);
router.get('/8', isLoggedIn, chat.d8);
router.post('/8', isLoggedIn, chat.d8);
router.get('/9', isLoggedIn, chat.d9);
router.post('/9', isLoggedIn, chat.d9);
router.get('/10', isLoggedIn, chat.d10);
router.post('/10', isLoggedIn, chat.d10);
router.get('/11', isLoggedIn, chat.d11);
router.post('/11', isLoggedIn, chat.d11);
router.get('/12', isLoggedIn, chat.d12);
router.post('/12', isLoggedIn, chat.d12);
router.get('/13', isLoggedIn, chat.d13);
router.post('/13', isLoggedIn, chat.d13);
router.get('/14', isLoggedIn, chat.d14);
router.post('/14', isLoggedIn, chat.d14);
router.get('/15', isLoggedIn, chat.d15);
router.get('/16', isLoggedIn, chat.d16);
router.get('/17', isLoggedIn, chat.d17);

//Check user Exist
router.post('/chatUserCheck', chat.userCheck);

//Back Button
router.post('/backStage', chat.backStage);

//Restart Button
router.post('/restart', chat.restart);

//User LogIn
router.post('/login', passport.authenticate('chat-login', {
    successRedirect : '/chat/loginsuccess',
    failureRedirect : '/chat/loginfailure',
    failureFlash: true
}));

router.get('/loginsuccess', function(req, res) {
    res.redirect('/chat/2');
});

router.get('/loginfailure', function(req, res){
    res.redirect(307, '/chat/signup');
});

//User SignUp
// process the signup form
router.post('/signup', passport.authenticate('chat-signup', {
    successRedirect : '/chat/signupsuccess',
    failureRedirect : '/chat/signupfailure',
    failureFlash: true
}));

router.get('/signupsuccess', function(req, res){
    res.redirect('/chat/2');
});
router.get('/signupfailure', function(req, res){    
    res.redirect('/chat/1');
});

//User Log out
router.get('/logout', function(req, res){
    res.redirect('/');
})

router.get('/getYearList', chat.getYearList);
router.get('/getCarList', chat.getCarList);

//Middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated() && req.user.role == 'chat'){
        return next();
    } else {
        res.redirect('/chat/1');
    }
}

module.exports = router;

