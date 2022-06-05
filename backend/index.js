const express = require('express'); 
const app = express(); 
const cors = require('cors')
const MongoClient = require("mongodb").MongoClient
const ObjectId = require('mongodb').ObjectID;
const MONGO_URL = 'mongodb://localhost:27017/wpr-quiz'
let _db = null

app.use(express.json())
app.use(cors())

MongoClient.connect(MONGO_URL,  function(err, client) {
	if (err) throw err
    _db = client.db()
	console.log("DB connected!")
})
app.listen(3001, function(){ 
    console.log('Listening on port 3001!'); 
});
app.get('/questions', async function(req, res){
    const result = await _db.collection("questions").find().toArray()
    res.status(200).json(result)
})
app.get('/questions/:id', async function(req, res){
    const result = await _db.collection('questions').findOne({_id:new ObjectId(req.params.id)})
    if(result !== null){
        res.status(200).json(result)
    }else{
        res.status(404).send()
    }
    
})

app.post('/questions', async function(req, res){
    const result = await _db.collection("questions").insertOne(req.body)
    res.status(201).json(req.body)
})
app.put('/questions/:id', async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    if(validate(req.body)){
        console.log("check")
        const result = await _db.collection('questions').findOneAndUpdate(
            {_id: new ObjectId(req.params.id)},
            {$set: req.body},
            function (err, documents) {
                res.status(200).json(documents.value)
                // res.send(documents);
            }
        )
    }else{
        res.status(404).send()
    }

   
    
})
function validate(body){
    if('text' in body && 'correctAnswer' in body && 'answers' in body && body.text !== null && body.correctAnswer !== null &&
    body.answers.length > 0 && body.text !== "" && body.correctAnswer !== ""){
        return true
    }
    return false
}
app.delete('/questions/:id', async function(req, res){
    const result = await 
    //{ "_id" : ObjectId("563237a41a4d68582c2509da") } 
        _db.collection("questions").deleteOne({"_id":new ObjectId(req.params.id)})
    res.status(200).send(result)
})