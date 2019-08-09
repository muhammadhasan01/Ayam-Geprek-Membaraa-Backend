// Load Modules
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const cors = require('cors')

const CONNECTION_URL = "mongodb+srv://spartahmif:decrypt2018@membara-wljwl.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

// Declaring usage of Express framework
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

var database, collection;

// Make serven listen to every request that made
app.listen(3001, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection_acc = database.collection("example");
        collection_ord = database.collection("order");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

// Routing to  'web'/signup and insert new data on the database
// based on POST request from the HTML registration form
app.post("/signup", (request, response) => {
	console.log(request.body);
    collection_acc.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//Routing to 'web'/login and responding POST request by validating or authenticating
// by checking on the database that user input on HTML form
app.post("/login", (request, response) => {
	console.log(request.body);
    collection_acc.findOne({ "username": request.body.username, "password": request.body.password }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// Routing to 'web'/order directory and responding POST request  from the HTML form
// by adding the menu that user select to the order list data
app.post("/order", (request, response) => {
	console.log(request.body);
    collection_ord.insertOne({...request.body, time: new Date(Date.now()).toISOString()}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

// Routing to 'web'/viewOrder and responding GET request by giving the menu list
// that user submitted before on 'web'/viewOrder HTML form
app.get("/viewOrder", (request, response) => {
    collection_ord.find({}).sort({time:1}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

// Routing 'web'/orderdone and reponding the POST HTML request by
//
app.post("/orderdone", (request, response) => {
    console.log(request.body);
    collection_ord.findOneAndUpdate({ "_id": new ObjectId(request.body._id) }, { $set: { done: true } }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});