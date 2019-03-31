import * as admin from "firebase-admin";
import fs from "fs";
import request from "request";

// Get a database reference to our blog

// tslint:disable-next-line:no-submodule-imports
import serviceAccount from "./serviceAccount";


admin.initializeApp({
  credential: admin.credential.cert(
    {
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key
    }
  ),
  databaseURL: "https://gottfried-leibniz.firebaseio.com"
});

const db = admin.database();

const download = (uri: any, filename: string, callback: () => void) => {
  request.head(uri, (err: any, res: { headers: { [x: string]: any; }; }, body: any) => {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};

const API_KEY = "rksLL7EMibN1tDdoEM3eDyc2gM95uHl1OUYzcs1GnPwChttxbwrj9hOo1rhUwlcJ";
const URL = "https://all.rir.rossum.ai/document"; // no trailing slash at the end

const MAX_ATTS = 20;
const WAIT = 10;
// processData(data){

// }
export const getData = async (uri: string, uid: string, key = "0") => {
  let done = false;
  let retData;
  download(uri, "test.png", () => {
    console.log("Done download.");
  });
  // upload the invoice first:
  const DOC_PATH = "test.png";
  const contentType = DOC_PATH.toLowerCase().endsWith(".png") ? "image/png" : "application/pdf";
  request.post({
    url: URL,
    method: "POST",
    headers: {
      Authorization: "secret_key " + API_KEY,
    },
    formData: {
      file: {
        value: fs.createReadStream("test.png"),
        options: {
          contentType
        }
      },
    },
  },

    (err: any, res: any, body: string) => {
      if (err) { return console.log(err); }
      const data = JSON.parse(body);
      // tslint:disable-next-line: variable-name
      const doc_id = data.id;
      console.log("File uploaded successfully (" + doc_id + ").");

      // poll for results:
      poll_for_results(doc_id);
    });

  // we don't want to wait before the first attempt to download the results
  // tslint:disable-next-line: unified-signatures
  function setIntervalImmediately(func: { (): void; (...args: any[]): void; (): void; }, interval: number) {
    func();
    return setInterval(func, interval);
  }

  // function to download the extraction results:
  // tslint:disable-next-line: variable-name
  function poll_for_results(doc_id: string) {
    // tslint:disable-next-line: variable-name
    let task_is_running = false;
    // tslint:disable-next-line: variable-name
    let n_atts = 0;

    // keep polling until there is a result or MAX_ATTS is reached,
    // display info to console:
    const refreshId = setIntervalImmediately(() => {
      if (!task_is_running) {
        task_is_running = true;
        request.get({
          url: URL + "/" + doc_id,
          method: "GET",
          headers: {
            Authorization: "secret_key " + API_KEY,
          },
        },

          (err: any, res: any, body: string) => {
            if (err) {
              task_is_running = false;
              return console.log(err);
            }
            const data = JSON.parse(body);
            if (data.status === "ready") {
              console.log("Document is ready:");
              console.log(data);
              clearInterval(refreshId);
              const ref = db.ref(`data/${uid}`);
              ref.set({
                processData: data
              });
              done = true;
              retData = data;
            } else if (data.status === "error") {
              console.log("There has been an error:");
              console.log(data.message);
              clearInterval(refreshId);
            } else if (n_atts < MAX_ATTS) {
              console.log((WAIT * n_atts).toString() + 's: status "processing", retrying.');
              n_atts++;
            } else {
              console.log("Timed out.");
              clearInterval(refreshId);
            }
          });

        task_is_running = false;
      }
    }, WAIT * 1000);
    }
return retData;
};


