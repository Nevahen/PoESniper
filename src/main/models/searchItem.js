import * as ws from "ws";
import * as poeHelper from "../poeconsts";
import * as poeAuth from "../poeauth";
import { ipcMain } from "electron";
import * as fetch from "node-fetch";

export class SearchItem {
  jsonIgnore = ["jsonIgnore", "connection"];

  constructor(data) {
    if (data === undefined) {
      data = {};
    }
    console.log(data);
    this.name = data.name || undefined;
    this.term = data.term || undefined;
    this.league = data.league || "standard";

    if (data.active === undefined) {
      this.active = true;
    } else {
      this.active = data.active;
    }
  }

  activate() {
    if (this.connection === undefined || this.connection.readyState === 4) {
      this.connection = new ws(this.buildUrl(), {
        headers: {
          Cookie: `POESESSID=${poeAuth.getSession()}`
        }
      });

      this.active = true;
      this.connection.on("open", () => {
        console.log(`WS connection opened for ${this.name}`);
      });

      this.connection.on("message", msg => {
        console.log("got message: " + msg);

        msg = JSON.parse(msg);
        if (msg.new) {
          this.handleNew(msg.new);
        }
      });

      this.connection.on("close", event => {
        console.log("disconnected " + this.name);
        this.connection = undefined;
      });
    } else {
      console.log("Socket already live");
    }
  }

  disconnect() {
    console.log(`disconnecting search "${this.name}"`);
    this.connection.close();
  }

  disable() {
    this.disconnect();
    this.active = false;
  }

  validateSearch() {
    if (
      this.name === undefined ||
      this.term === undefined ||
      this.league === undefined ||
      this.activate === undefined
    ) {
      return false;
    }
    return true;
  }

  buildUrl() {
    return `wss://www.pathofexile.com/api/trade/live/${this.league}/${
      this.term
    }`;
  }

  handleNew(data) {
    while (data.length > 0) {
      // Poe api doesn't let you query more than 10 items at time
      let dataToFetch = data.splice(0, 10);

      let url = poeHelper.ITEM_FETCH_URL + dataToFetch.join(",");
      fetch(url)
        .then(resp => resp.json())
        .then(json => {
          json.result.forEach(item => {
            if (item.gone) {
              console.log("this item is gone");
              return;
            }

            this.manager.main
              .getAllWindows()[0]
              .webContents.send("newItem", item);
            console.log(item);
          });
        })
        .catch(err => console.log(err));
    }
  }

  json() {
    return JSON.stringify(this, (k, v) => {
      if (!this.jsonIgnore.includes(k)) {
        return v;
      }
    });
  }
}
