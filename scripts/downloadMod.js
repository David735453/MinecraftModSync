const fs = require('fs');
const axios = require('axios');

const downloadMod = async (fileName, fileURL, environment, config = {}) => {
  try {
    const response = await axios({
      method: 'get',
      url: fileURL,
      responseType: 'stream',
      ...config,
    });

    const writer = fs.createWriteStream(`mods/${environment}/${fileName}`);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`${fileName} download and save complete.`);
        resolve();
      });
      writer.on('error', (err) => {
        console.error('Error writing file:', err);
        reject(err);
      });
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

module.exports = { downloadMod };
