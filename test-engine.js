const http = require('http');
const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/gas/serverGetPendingScene',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data.slice(0, 500)));
});
req.write(JSON.stringify({ args: ["scene_prologue", { globals: {} }] }));
req.end();
