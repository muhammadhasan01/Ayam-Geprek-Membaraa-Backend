Contact = require('./contactModel');

exports.index = function(req,res){
    Contact.get(function (err,contacts){
        if (err){
            res.json({
                status : 'error',
                message : err
            })
        }
        res.json({
            status : 'succcess',
            message : 'yaa.. begitulah',
            data : contacts
        })
    })
}

exports.new = function (req,res){
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.boy.phone;
    contact.save(function (err){
        if (err){
            res.json(err)
        }
        res.json({
            message : 'akun udah jadi nih lurr',
            data : contact
        })
    })
};

exports.view = function(req,res){
    Contact.findById(req.params.contact_id,function(err,contact){
        if(err){
            res.send(err)
        }
        res.json({
            message : ' kayaknya ada nih lurr datanya',
            data : contact
        })
    })
}

exports.update = function (req,res){
    Contact.findById(req.params.contact_id, function(err, contact){
        if(err){
            res.send(err)
        }
        contact.name = req.body.name? req.body.name: contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.body.email;
        contact.phone = req.body.phone;
        contact.save(function(err){
            if (err)
                res.json(err);
            res.json({
                message :'dah diupdate gan',
                data : contact
            })
        })
    })
}

exports.delete = function (req,res){
    Contact.remove({
        _id : req.params.contact_id
    }, function(err,contact){
        if (err){
            res.send(err)
        }
        res.json({
            status : 'success',
            message : 'user dah dihapus nih'
        })
    })
}