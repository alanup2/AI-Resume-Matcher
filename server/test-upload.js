const fs = require('fs');
const path = require('path');
const http = require('http');

const uploadsDir = path.join(__dirname, 'uploads');
const files = fs.readdirSync(uploadsDir).filter(f => f.endsWith('.pdf'));
const filePath = path.join(uploadsDir, files[0]);
console.log('Uploading:', files[0]);

const fileBuffer = fs.readFileSync(filePath);
const boundary = '------' + Date.now();

let body = '';
body += `------${Date.now()}\r\n`;
body += `Content-Disposition: form-data; name="resume"; filename="${files[0]}"\r\n`;
body += `Content-Type: application/pdf\r\n\r\n`;

const bodyStart = Buffer.from(`------${Date.now()}\r\nContent-Disposition: form-data; name="resume"; filename="${files[0]}"\r\nContent-Type: application/pdf\r\n\r\n`, 'utf-8');
const bodyEnd = Buffer.from(`\r\n------${Date.now()}--\r\n`, 'utf-8');
const bodyTotal = Buffer.concat([bodyStart, fileBuffer, bodyEnd]);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/resume/upload',
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=----${Date.now()}`,
    'Content-Length': bodyTotal.length,
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const parsed = JSON.parse(data);
      if (parsed.error) {
        console.log('ERROR:', parsed.error);
      } else {
        console.log('Score:', parsed.ai?.score);
        console.log('Skills count:', parsed.ai?.skills?.length);
        console.log('Suggestions count:', parsed.ai?.suggestions?.length);
        console.log('Matches count:', parsed.matches?.length);
        if (parsed.matches?.length > 0) {
          console.log('Top match:', parsed.matches[0].role, '-', parsed.matches[0].match + '%');
        }
      }
    } catch {
      console.log('RAW:', data.substring(0, 500));
    }
  });
});

req.on('error', (e) => console.log('REQUEST ERROR:', e.message));
req.write(bodyTotal);
req.end();
