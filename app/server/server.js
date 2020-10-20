
    function app () {
        let express = require('express');
        let app = express();

        app.get('/', function(req, res) {
           res.send("Local server is running...");
        });

        app.post('/list', function (req, res) {
            res.send('POST request to the homepage')
        })    
        
      //  const { promisify } = require('util'); // tillader os at bruge async/await
      //  const exec = promisify(require("child_process").exec); // Node-funktion der tager en shell command og returnerer et promise


        let server = app.listen(3783, function () {
            console.log('Express server listening on port ' + server.address().port);
        })
        // If the application is refreshed and the server isn't shut down, listen on different port
        .on('error', function(err) {
             console.error('port is already in use'); 
             server.close();
            let server2 = app.listen(3782, function () {
                console.log('Express server listening on port ' + server2.address().port);
            })
        });


    }

module.exports = app;
