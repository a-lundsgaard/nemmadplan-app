const { default: fetch } = require('node-fetch');
const express = require('express');
const app = express();
const salesRoute = require('./routes/sales');
// const PORT = 8090;
const bodyParser = require('body-parser');

async function spinUpServerOn(PORT, signal) {

    app.use(bodyParser.json());


    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });


    app.get('/', function (req, res) {
        
        res.send(`Local sales server is running on port ${app.l} and signal ${signal}...`);
    });


    app.use('/sales', salesRoute);


    try {
        await fetch(`http://localhost:${PORT}/`);

    } catch (error) {
        console.log(`Could not fetch from local server running on ${PORT}, starting new server and displays error:`)
     //   console.error(error)
        let localServer = app.listen(PORT, function () {
            console.log('EXPRESS SERVER IS LISTENING ON PORT ' + localServer.address().port);
        })

    }
}

//spinUpServerOn(8090, 'hej fra mig')



module.exports = spinUpServerOn;
