import { API_KEY, URL } from '../config/keys';
// polling settings (for download of results):
const MAX_ATTS = 12;
const WAIT = 5; // how many seconds to wait between attempts


export const getExtractedData = async (DOC_PATH) => {
  const contentType = DOC_PATH.toLowerCase().endsWith('.png') ? 'image/pdf' : 'application/pdf';

  fetch.post(URL, {
    method: 'POST',
    mode: 'cors', // no-cors, cors, *same-origin
    headers: {
      Authorization: `secret_key ${API_KEY}`,

    },
    formData: {
      file: {
        value: fs.createReadStream(DOC_PATH),
        options: {
          contentType
        }
      },
    }
  });

  const metadata = {
    contentType: 'image/jpeg'
  };

  const blob = await new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const xhr = new XMLHttpRequest();
    // eslint-disable-next-line func-names
    xhr.onload = function () {
      resolve(xhr.response);
    };
    // eslint-disable-next-line func-names
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('POST', URI, true);
    xhr.send(File);
  });

  // upload the invoice first:
  request.post({
    url: URL,
    method: 'POST',
    headers: {
      Authorization: `secret_key ${API_KEY}`,
    },
    formData: {
      file: {
        value: fs.createReadStream(DOC_PATH),
        options: {
          contentType
        }
      },
    },
  },

  (err, res, body) => {
    if (err) { return console.log(err); }
    const data = JSON.parse(body);
    const doc_id = data.id;
    console.log(`File uploaded successfully (${doc_id}).`);

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
    let task_is_running = false;
    let n_atts = 0;

    // keep polling until there is a result or MAX_ATTS is reached,
    // display info to console:
    var refreshId = setIntervalImmediately(() => {
      if (!task_is_running) {
        task_is_running = true;
        request.get({
          url: `${URL}/${doc_id}`,
          method: 'GET',
          headers: {
            Authorization: `secret_key ${API_KEY}`,
          },
        },

        (err, res, body) => {
          if (err) {
            task_is_running = false;
            return console.log(err);
          }
          const data = JSON.parse(body);
          if (data.status == 'ready') {
            console.log('Document is ready:');
            console.log();
            console.log(data);
            console.log();
            console.log(`https://rossum.ai/document/${doc_id}?apikey=${API_KEY}`);
            clearInterval(refreshId);
          } else if (data.status == 'error') {
            console.log('There has been an error:');
            console.log(data.message);
            clearInterval(refreshId);
          } else if (n_atts < MAX_ATTS) {
            console.log(`${(WAIT * n_atts).toString()}s: status "processing", retrying.`);
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
};
