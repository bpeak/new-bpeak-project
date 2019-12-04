const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const audios = [];

app.use('/audio', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    console.log('저어장');
    console.log(file);
    cb(null, `ddddd.webm`);
  },
});

const upload = multer({ storage });

app.post('/api/r', upload.single('imgFile'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({
    file: req.file,
    // base: req.file.buffer.toString('base64'),
  });
});

app.get('/test', (req, res) => {
  res.send('t');
});

app.post('/record', (req, res) => {
  console.log(req.body);
  audios.push(req.body.blob);
  res.send('ok');
});

app.get('/audios', (req, res) => {
  res.json({
    audios,
  });
});

app.listen(70, () => {
  console.log(`p+++ort 70`);
});
