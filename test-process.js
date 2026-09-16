const http = require('http');
const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/gas/serverProcessChoice',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data.slice(0, 500)));
});
req.write(JSON.stringify({ args: ["choice_a1_observe", { 
  sceneId: "ACTE1_01_REVEIL",
  flags: [],
  gauges: {}
}] }));
req.end();
