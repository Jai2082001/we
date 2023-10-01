const express = require('express');
const bodyParser = require("body-parser");
const ShwarmaOrder = require("./shwarma/assignment1Shwarma");
const Order = require('./welcome/2-Order.js');
// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oOrders = {};
app.post("/sms", (req, res) => {
    let sFrom = req.body.From || req.body.from;
    if (!oOrders.hasOwnProperty(sFrom)) {
        oOrders[sFrom] = new Order();
    }
    console.log(sFrom);
    let sMessage = req.body.Body || req.body.body;
    console.log(sMessage)
    let aReply =  oOrders[sFrom].handleInput(sMessage);
    let oOrders1 = {}
    // let sFrom1 = req.body.From || req.body.from;
    // if(oOrders1.hasOwnProperty(sFrom1)){
    //     oOrders1[sFrom1] = new ShwarmaOrder();
    // }
    // let sMessage1 = req.body.Body || req.body.body;
    // aReply = oOrders[sFrom].handleInput(sMessage1);
    // if(oOrders[sFrom].isDone()){
    //     delete oOrders[sFrom];
    // }
    


    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for (let n = 0; n < aReply.length; n++) {
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");
});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3002;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
