// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
//mongoose.connect('mongodb://localhost/vendorconnect');
/*var promise = mongoose.connect('mongodb://localhost/vendorconnect', {
  useMongoClient: true,
});*/
mongoose.createConnection('mongodb://localhost/vendorconnect', { server: { poolSize: 4 }});

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var VendorProduct = mongoose.model('VendorProduct', {
    productid: Number,
    displayname: String,
    manufacturer: String,
	source: String
});

// Routes

    // Get reviews
    app.get('/api/vendorproducts', function(req, res) {

        console.log("fetching product details");

        // use mongoose to get all vendor products in the database
        VendorProduct.find(function(err, vendorproducts) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(vendorproducts); // return all vendorproducts in JSON format
        });
    });

    // create review and send back all reviews after creation
    app.post('/api/vendorproducts', function(req, res) {

        console.log("creating vendor product");

        // create a review, information comes from request from Ionic
        VendorProduct.create({
            productid : req.body.productid,
            displayname : req.body.displayname,
            manufacturer: req.body.manufacturer,
			source: req.body.source,
            done : false
        }, function(err, vendorproduct) {
            if (err)
                res.send(err);

            // get and return all the reviews after you create another
            VendorProduct.find(function(err, vendorproducts) {
                if (err)
                    res.send(err)
                res.json(vendorproducts);
            });
        });

    });

    // delete a review
    /*app.delete('/api/reviews/:review_id', function(req, res) {
        Review.remove({
            _id : req.params.review_id
        }, function(err, review) {

        });
    });*/


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");