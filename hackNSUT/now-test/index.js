var fs = require('fs');
const request = require('request');

const download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const API_KEY = 'rksLL7EMibN1tDdoEM3eDyc2gM95uHl1OUYzcs1GnPwChttxbwrj9hOo1rhUwlcJ';
const DOC_PATH = 'https://www.chargify.com/blog/wp-content/uploads/2018/02/relationship-invoicing-cover.png';
const URL = 'https://all.rir.rossum.ai/document'; // no trailing slash at the end

// polling settings (for download of results):
const MAX_ATTS = 12;
const WAIT = 5;  // how many seconds to wait between attempts

const contentType = DOC_PATH.toLowerCase().endsWith('.png') ? 'image/png' : 'application/pdf'


const getData = (uri) => {
  var data  = {}
  download(uri, 'test.png', function () {
    console.log('Done download.');
  });
  // upload the invoice first:
  request.post({
    url: URL,
    method: 'POST',
    headers: {
      'Authorization': 'secret_key ' + API_KEY,
    },
    formData: {
      file: {
        value: fs.createReadStream('test.png'),
        options: {
          contentType: contentType
        }
      },
    },
  },

    (err, res, body) => {
      if (err) { return console.log(err); }
      var data = JSON.parse(body);
      var doc_id = data.id;
      console.log('File uploaded successfully (' + doc_id + ').');

      // poll for results:
      poll_for_results(doc_id);
    });

  // we don't want to wait before the first attempt to download the results
  function setIntervalImmediately(func, interval) {
    func();
    return setInterval(func, interval);
  }

  // function to download the extraction results:
  function poll_for_results(doc_id) {
    var task_is_running = false;
    var n_atts = 0;

    // keep polling until there is a result or MAX_ATTS is reached,
    // display info to console:
    var refreshId = setIntervalImmediately(function () {
      if (!task_is_running) {
        task_is_running = true;
        request.get({
          url: URL + '/' + doc_id,
          method: 'GET',
          headers: {
            'Authorization': 'secret_key ' + API_KEY,
          },
        },

          (err, res, body) => {
            if (err) {
              task_is_running = false;
              return console.log(err);
            }
            data = JSON.parse(body);
            if (data.status == 'ready') {
              console.log('Document is ready:');
              console.log(data);
              clearInterval(refreshId);
            } else if (data.status == 'error') {
              console.log('There has been an error:');
              console.log(data.message);
              clearInterval(refreshId);
            } else if (n_atts < MAX_ATTS) {
              console.log((WAIT * n_atts).toString() + 's: status "processing", retrying.')
              n_atts++;
            } else {
              console.log('Timed out.');
              clearInterval(refreshId);
            }
          });

        task_is_running = false;
      }
    }, WAIT * 1000);
  }
  return data;
}

fn = async() => {
  return Data;
} 

const { parse } = require('url')


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const data = getData(req)
    res.send(data)
}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
