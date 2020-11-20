const express = require('express');
const request = require('request');
const spinUpServerOn = require('../salesServer2');
const app = express();
const { default: fetch } = require('node-fetch');


async function spinUpLoadBalancerAndServers(loadBalancerPort, ...serverPorts) {

  //const servers = ['http://localhost:8090', 'http://localhost:8070'];

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  const servers = serverPorts.map((port) => 'http://localhost:' + port)

  let cur = 0;

  const handler = (req, res) => {
    // Pipe the vanilla node HTTP request (a readable stream) into `request`
    // to the next server URL. Then, since `res` implements the writable stream
    // interface, you can just `pipe()` into `res`.
    console.log('Fandt REQUEST URL:::::')
    console.log(req.url)
    req.pipe(request({ url: servers[cur] + req.url })).pipe(res);

    cur = (cur + 1) % servers.length;
    console.log('FORWARDING REQUEST TO : ' + servers[cur])
    // 1 % 2 = 1
    // 2 % 2 = 0
    // console.log(res.text());
  };

  const server = app.get('*', handler).post('*', handler);

  try {
    await fetch(`http://localhost:${loadBalancerPort}/`);

} catch (error) {
    console.error(`Could not fetch from local load balancer server running on ${loadBalancerPort}, starting new server and displays error:`)
    console.error(error)
    let localServer = server.listen(loadBalancerPort, function () {
        console.log('EXPRESS SERVER IS LISTENING ON PORT ' + localServer.address().port);
    })

}

  //server.listen(loadBalancerPort);

  serverPorts.forEach((port) => spinUpServerOn(port))

}

//spinUpLoadBalancerAndServers(8060, 8070, 8090, 8010)


module.exports = spinUpLoadBalancerAndServers;