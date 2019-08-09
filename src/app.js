const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const cors = require('cors')

const CONNECTION_URL = "mongodb+srv://spartahmif:decrypt2018@membara-wljwl.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors())

var database, collection;

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

app.post("/signup", (request, response) => {
	console.log(request.body)
    collection_acc.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.post("/login", (request, response) => {
	console.log(request.body)
    collection_acc.findOne({ "username": request.body.username, "password": request.body.password }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/order", (request, response) => {
	console.log(request.body)
    collection_ord.insertOne({...request.body, time: new Date(Date.now()).toISOString()}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/viewOrder", (request, response) => {
    collection_ord.find({}).sort({time:1}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/orderdone", (request, response) => {
    console.log(request.body)
    collection_ord.findOneAndUpdate({ "_id": new ObjectId(request.body._id) }, { $set: { done: true } }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});