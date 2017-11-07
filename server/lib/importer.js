const csv = require("fast-csv");
const trie = require('./trie');

class Importer {
  constructor(path) {
    this.path = path;
  }

  run() {
    console.log('Importing and Indexing ...')
    csv
      .fromPath(this.path)
      .on("data", (data) => {
        trie.add(data[1]);
      })
      .on("end", () => {
        console.log('Finished successfully, server is ready.');
      });
  }
}

module.exports = Importer;
