let Router = require('express').Router();

Router.get('/', function(req,res){
    res.json({
        status : 'API Its Working',
        message : 'Hiya2'
    })
})

var contactController = require('./contactController');

Router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

Router.route('contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.update);

module.exports = Router;