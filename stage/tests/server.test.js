const { describe, it, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

// Helper to make HTTP requests
function get(port, path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

describe('Server', () => {
  let server;
  const TEST_PORT = 19199;

  after(() => {
    if (server) server.close();
  });

  it('starts and serves health check', async () => {
    const { createServer } = require('../server/index');
    server = await createServer({ port: TEST_PORT, mode: 'simulator' });

    const res = await get(TEST_PORT, '/api/health');
    assert.strictEqual(res.status, 200);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.status, 'ok');
  });

  it('serves config endpoint', async () => {
    const res = await get(TEST_PORT, '/api/config');
    assert.strictEqual(res.status, 200);
    const body = JSON.parse(res.body);
    assert.ok(body.agents);
    assert.ok(body.theme);
    assert.ok(body.locale);
  });

  it('serves theme manifest', async () => {
    const res = await get(TEST_PORT, '/api/theme');
    assert.strictEqual(res.status, 200);
    const body = JSON.parse(res.body);
    assert.ok(body.theme);
    assert.ok(body.animations);
  });

  it('serves static files', async () => {
    const res = await get(TEST_PORT, '/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.headers['content-type'].includes('html'));
  });
});
