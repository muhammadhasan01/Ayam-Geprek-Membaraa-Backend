let express = require('express');
let apiRoutes = require('./api-routes');
let bodyParser = require('body-parser');
let mongoose = require ('mongoose');

let app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

var db = mongoose.connection;
if(!db){
    console.log('gaada beneran ini teh')
}
else{
    console.log('Ini teh mantep beneran bisa konek')
}
app.get('/', (req, res) => res.send('input disini~'));
app.use('/api', apiRoutes);
app.listen (port, function(){
    console.log('input disini')
});