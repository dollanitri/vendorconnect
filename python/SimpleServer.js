const express = require('express')
const SimpleServer = express()
const port = 3000
var myParser = require("body-parser"); 
var amqp = require('amqplib/callback_api')

SimpleServer.use(myParser.urlencoded({extended : true}));
SimpleServer.use(myParser.json());

SimpleServer.post('/sentiment', function(request,response){
	console.log(request.body);
	call_sentiment(request, response);
});

function call_sentiment(req, res) {
  var input = req.body;
  console.log(input);
  
  amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
      var sentiments = 'sentiments';
      ch.assertQueue(sentiments, { durable: false });
      var results = 'results';
      ch.assertQueue(results, { durable: false });

      ch.sendToQueue(sentiments, new Buffer(JSON.stringify(input)));

      ch.consume(results, function (msg) {
        res.send(msg.content.toString())
      }, { noAck: true });
    });
    setTimeout(function () { conn.close(); }, 500); 
    });
}

SimpleServer.listen(port, () => console.log(`Example app listening on port ${port}!`))