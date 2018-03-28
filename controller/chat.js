var chatuser = require('../module/chatuser');
var User = require('../model/chatuser');
var chatuserArray = [];

exports.userCheck = function(req, res){
    var email = req.body.email;
    console.log(email);
    User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
            res.json({ret:false});
        if (!user){
            console.log("there");
            res.json({ret:false});
        }else{
            console.log("here");
            res.json({ret:true});
        }
    });
}

exports.backStage = function(req, res){
    var email = req.user.local.email;
    var stage = Number(chatuserArray[email].getStage());
    if(stage == 4 && chatuserArray[email].getMariteral() == 'Single'){
        res.redirect('/chat/2');
    }else if(stage == 13 && (chatuserArray[email].getMariteral() == 'Single' || chatuserArray[email].getCoverage() == 'One')){
        res.redirect('/chat/8');
    }else{
        res.redirect('/chat/'+(stage-1).toString());
    }    
}

exports.restart = function(req, res){
    res.redirect('/chat/1');
}

exports.index = function(req, res){
    res.render('chat/1', { title: 'Express' });
}

exports.d1 = function(req, res){
    res.render('chat/1');
}
exports.d2 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        chatuserArray[email] = new chatuser();
        chatuserArray[email].setEmail(email);
        chatuserArray[email].setStage(2);
        chatuserArray[email].setProfile({firstName: req.user.firstName, lastName: req.user.lastName});
        res.render('chat/2', {name: chatuserArray[email].getProfile()});
    }else{
        if(req.body.firstName)
            chatuserArray[email].setProfile({firstName: req.user.firstName, lastName: req.user.lastName});
        var stage = chatuserArray[email].getStage();        
        res.render('chat/2', {name: chatuserArray[email].getProfile(), mariteral: chatuserArray[email].getMariteral()});        
    }
}
exports.d3 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.mariteral)
            chatuserArray[email].setMariteral(req.body.mariteral);
        chatuserArray[email].setStage(3);
        if(chatuserArray[email].getMariteral() == 'Single'){
            res.redirect('/chat/4');
        }else{
            res.render('chat/3', { coverage: chatuserArray[email].getCoverage()});
        }            
    }    
}
exports.d4 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.cover)
            chatuserArray[email].setCoverage(req.body.cover);
        chatuserArray[email].setStage(4);
        res.render('chat/4', {carModel: chatuserArray[email].getCarModel()});
    }    
}
exports.d5 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.carModel)
            chatuserArray[email].setCarModel(req.body.carModel);
        chatuserArray[email].setStage(5);
        res.render('chat/5', {miles: chatuserArray[email].getMiles()});
    }    
}
exports.d6 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.miles)
            chatuserArray[email].setMiles(req.body.miles);
        chatuserArray[email].setStage(6);
        res.render('chat/6', {education: chatuserArray[email].getEducation()});
    }    
}
exports.d7 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.education)
            chatuserArray[email].setEducation(req.body.education);
        chatuserArray[email].setStage(7);
        res.render('chat/7', {birthday: chatuserArray[email].getBirthday()});
    }    
}
exports.d8 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.dd && req.body.mm && req.body.yyyy)
            chatuserArray[email].setBirthday({dd:req.body.dd, mm: req.body.mm, yyyy: req.body.yyyy});
        chatuserArray[email].setStage(8);
        res.render('chat/8', {incident: chatuserArray[email].getIncident()});
    }
}
exports.d9 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.incident)
            chatuserArray[email].setIncident(req.body.incident);
        if(chatuserArray[email].getMariteral() == 'Couple' && chatuserArray[email].getCoverage() == 'Two'){
            chatuserArray[email].setStage(9);
            res.render('chat/9', {spouseName: chatuserArray[email].getSpouseName()});
        }else{
            res.redirect('/chat/13');
        }            
    }    
}
exports.d10 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(chatuserArray[email].getMariteral() == 'Couple' && chatuserArray[email].getCoverage() == 'Two'){
            if(req.body.name)
                chatuserArray[email].setSpouseName(req.body.name);
            chatuserArray[email].setStage(10);
            res.render('chat/10', {education: chatuserArray[email].getSpouseEducation()});
        }else{
            res.redirect('/chat/13');
        }
    }
}
exports.d11 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(chatuserArray[email].getMariteral() == 'Couple' && chatuserArray[email].getCoverage() == 'Two'){
            if(req.body.education)
                chatuserArray[email].setSpouseEducation(req.body.education);
            chatuserArray[email].setStage(11);            
            res.render('chat/11', {birthday: chatuserArray[email].getSpouseBirthday()});
        }else{
            res.redirect('/chat/13');
        }
    }
}
exports.d12 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(chatuserArray[email].getMariteral() == 'Couple' && chatuserArray[email].getCoverage() == 'Two'){
            if(req.body.dd && req.body.mm && req.body.yyyy){
                chatuserArray[email].setSpouseBirthday({dd:req.body.dd, mm: req.body.mm, yyyy: req.body.yyyy});
            }            
            chatuserArray[email].setStage(12);
            res.render('chat/12', {incident: chatuserArray[email].getSpouseIncident()});
        }else{
            res.redirect('/chat/13');
        }        
    }
}
exports.d13 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.incident)
            chatuserArray[email].setSpouseIncident(req.body.incident);
        chatuserArray[email].setStage(13);
        res.render('chat/13', {zip: chatuserArray[email].getZipCode()});
    }
}
exports.d14 = function(req, res){
    var email = req.user.local.email;
    if(chatuserArray[email] == null){
        res.render('chat/1');
    }else{
        if(req.body.zip)
            chatuserArray[email].setZipCode(req.body.zip);
        chatuserArray[email].setStage(14);
        res.render('chat/14');
    }
}
exports.d15 = function(req, res){
    res.render('chat/15');
}
exports.d16 = function(req, res){
    res.render('chat/16');
}
