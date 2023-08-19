const axios = require('axios');
const fs = require('fs');

// Json file in which the mods are defined
const filePath = 'ModsJSON.json';

const jsonFile = fs.readFileSync(filePath, 'utf8');
const ModsJSON = JSON.parse(jsonFile);

let gameVersion = ModsJSON.gameVersion;
let loader = ModsJSON.loader;

ModsJSON.modsList.map((mod) => {

    axios.get(`https://api.modrinth.com/v2/project/${mod.Project_ID}/version?game_versions=["${gameVersion}"]&loaders=["${loader}"]`)
        .then(res => {
            let fileName = res.data[0].files[0].filename;
            let fileURL = res.data[0].files[0].url;

            fs.mkdirSync('mods', { recursive: true }); // create mods folder at current file path

            axios({
                method: 'get',
                url: fileURL,
                responseType: 'stream'
            })
                .then(response => {
                    const writer = fs.createWriteStream(`mods/${fileName}`); // Downloaded mod jars will be saved in mods folder 
                    response.data.pipe(writer);

                    writer.on('finish', () => {
                        console.log('File download and save completed.');
                    });

                    writer.on('error', err => {
                        console.error('Error writing file:', err);
                    });
                })
                .catch(error => {
                    console.error('Error downloading file:', error);
                });
        })
        .catch(err => console.log(err));
});
