const { default: fetch } = require('node-fetch');

    async function app () {
        let express = require('express');
        let app = express();

        app.get('/', function(req, res) {
           res.send("Local server is running...");
        });

        app.post('/list', function (req, res) {
            res.send('POST request to the homepage')
        })    

      try {
        await fetch('http://localhost:3001/');
        
      } catch (error) {
          console.error('Could not fetch from local server, starting new server and displays error:')
          console.error(error)
          let localServer = app.listen(3001, function () {
            console.log('Express server listening on port ' + localServer.address().port);
        })
          
      }

    }

module.exports = app;
