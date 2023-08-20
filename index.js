const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Json file in which the mods are defined
const filePath = 'ModsConfig.json';

const jsonFile = fs.readFileSync(filePath, 'utf8');
const ModsJSON = JSON.parse(jsonFile);

let gameVersion = ModsJSON.gameVersion;
let loader = ModsJSON.loader;
let loaderType = (loader == 'fabric') ? 4 : 1;

fs.mkdirSync('mods', { recursive: true }); // create mods folder at current file path

ModsJSON.modsList_Modrinth.map((mod) => {

    axios.get(`https://api.modrinth.com/v2/project/${mod.Project_ID}/version?game_versions=["${gameVersion}"]&loaders=["${loader}"]`)
        .then(res => {
            let fileName = res.data[0].files[0].filename;
            let fileURL = res.data[0].files[0].url;

            axios({
                method: 'get',
                url: fileURL,
                responseType: 'stream'
            })
                .then(response => {
                    const writer = fs.createWriteStream(`mods/${fileName}`); // Downloaded mod jars will be saved in mods folder 
                    response.data.pipe(writer);

                    writer.on('finish', () => {
                        console.log(`${fileName} download and save completed.`);
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


ModsJSON.modsList_CurseForge.map((mod) => {

    const config = {
        maxBodyLength: Infinity,
        headers: {
            'x-api-key': process.env.CF_API_KEY,
        },
    };

    axios.get(`https://api.curseforge.com/v1/mods/${mod.Project_ID}/files?gameVersion=${gameVersion}&modLoaderType=${loaderType}`, config)
        .then(res => {

            let fileName = res.data.data[0].fileName;
            let fileURL = res.data.data[0].downloadUrl;

            axios({
                method: 'get',
                url: fileURL,
                responseType: 'stream',
                headers: {
                    'x-api-key': process.env.CF_API_KEY,
                }
            })
                .then(response => {
                    const writer = fs.createWriteStream(`mods/${fileName}`); // Downloaded mod jars will be saved in mods folder 
                    response.data.pipe(writer);

                    writer.on('finish', () => {
                        console.log(`${fileName} download and save completed.`);
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
