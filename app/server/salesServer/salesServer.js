const { default: fetch } = require('node-fetch');

async function app() {
    const express = require('express');
    const app = express();
    const salesRoute = require('./routes/sales');
    const PORT = 8090;
    const bodyParser = require('body-parser');

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
        res.send("Local sales server is running...");
    });


    app.use('/sales', salesRoute);


    try {
        await fetch(`http://localhost:${PORT}/`);

    } catch (error) {
        console.error(`Could not fetch from local server running on ${PORT}, starting new server and displays error:`)
        console.error(error)
        let localServer = app.listen(PORT, function () {
            console.log('Express server listening on port ' + localServer.address().port);
        })

    }
}


module.exports = app;
