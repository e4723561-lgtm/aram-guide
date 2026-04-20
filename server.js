const http = require('http');
const https = require('https');

const PORT = 3000;

// 若 lolalytics 改版，只需更新此函式的欄位名稱
function parseAramData(json) {
  if (!json || typeof json !== 'object') throw new Error('unexpected structure');

  // 嘗試從常見欄位結構取出資料（lolalytics 非官方 API，結構可能改變）
  const items = [];
  if (Array.isArray(json.items)) {
    json.items.slice(0, 6).forEach(item => {
      if (item && item.id) items.push({ id: item.id, name: item.name || String(item.id) });
    });
  }

  const runes = {
    keystone: { id: 0, name: json.runes?.keystone || '' },
    primaryPath: json.runes?.primary || '',
    secondaryPath: json.runes?.secondary || ''
  };

  const skillOrder = Array.isArray(json.skillOrder) ? json.skillOrder : ['Q', 'W', 'E'];

  if (items.length === 0) throw new Error('no items found');
  return { items, runes, skillOrder };
}

function fetchLolalytics(championId) {
  return new Promise((resolve, reject) => {
    // lolalytics ARAM（queue=450）端點，非官方，若失敗會自動 fallback
    const path = `/api/champion/?patch=&tier=all&queue=450&region=all&lang=zh_TW&champ=${championId}`;
    const options = {
      hostname: 'lolalytics.com',
      path,
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    };

    const req = https.get(options, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`http ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('json parse error')); }
      });
    });

    req.setTimeout(5000, () => { req.destroy(); reject(new Error('timeout')); });
    req.on('error', reject);
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const match = req.url.match(/^\/aram\/(.+)$/);
  if (!match) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }

  const championId = decodeURIComponent(match[1]);
  if (!/^[a-zA-Z0-9_' ]{1,30}$/.test(championId)) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'invalid champion id' }));
    return;
  }

  fetchLolalytics(championId)
    .then(json => {
      const data = parseAramData(json);
      res.writeHead(200);
      res.end(JSON.stringify(data));
    })
    .catch(err => {
      console.log(`[fallback] ${championId}: ${err.message}`);
      res.writeHead(200);
      res.end(JSON.stringify({ fallback: true }));
    });
});

server.listen(PORT, () => {
  console.log(`ARAM proxy server 啟動於 http://localhost:${PORT}`);
  console.log('請在瀏覽器開啟 index.html');
});
