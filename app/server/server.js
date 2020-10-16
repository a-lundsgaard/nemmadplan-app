(
    function() {
        let express = require('express');
        let app = express();

        app.get('/', function(req, res) {
           res.send("Local server is running...");
        });

        app.post('/list', function (req, res) {
            res.send('POST request to the homepage')
        })


        let server = app.listen(3783, function () {
            console.log('Express server listening on port ' + server.address().port);
        });
        module.exports = app;
    }()
);