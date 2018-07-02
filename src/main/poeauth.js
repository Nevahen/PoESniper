const fetch = require("node-fetch");
const poeUrls = require("./poeconsts");

var sessionID;

function setSession(sess) {
  sessionID = sess;
}

function getSession() {
  return sessionID;
}

function verifySessionId(sessionID) {
  return new Promise((resolve, reject) => {
    fetch(poeUrls.IGNORE_LIST_URL, {
      headers: {
        Cookie: `POESESSID=${sessionID}`
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          return false;
        } else {
          setSession(sessionID);
          return true;
        }
      })
      .then(isValid => {
        resolve(isValid);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export { verifySessionId, getSession };
