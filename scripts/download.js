const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const ModsConfig = require('../ModsConfig.json');
const { getFollowedProjectsModrinth, getCollectionProjects } = require('./getProjectsList');
const { downloadMod } = require('./downloadMod');

// Delete the 'mods' folder if it exists
if (fs.existsSync('mods')) {
  fs.rmSync('mods', { recursive: true, force: true });
}
console.log('Deleted the mods folder');

/**
 * As Modrinth have introduced public collections   
 * There is no need to manually update configs file
 * Public collection can now be used for the list 
 * 
 * Requires config to define other options like version, loader, collection id
 * 
 * If no collection id then it downloads from follows list 
 * Follows list needs api key as its private collection
 */
const downloadModrinth = async (environment) => {

  const { gameVersion, loader, modrinthCollectionId } = ModsConfig;
  const projectList = modrinthCollectionId?.[environment] ? await getCollectionProjects(environment) : await getFollowedProjectsModrinth();


  for (const project of projectList) {
    try {
      const res = await axios.get(`https://api.modrinth.com/v2/project/${project.Project_ID}/version?game_versions=["${gameVersion}"]&loaders=["${loader}"]`);
      const fileData = res.data[0].files[0];
      const { filename: fileName, url: fileURL } = fileData;
      await downloadMod(fileName, fileURL, environment);
    }
    catch (err) {
      console.log(`${project.Mod_Name} -> Not Available (or Unknown error)`);
      // console.error(err.message); For debugging purposes
    }
  };
};


/**
 * No changes to CurseForge due to fact that  
 *  - there is no way to get favouries by username (CSRF protection)
 *  
 * uses the modsConfig for curseforge
 */
const downloadCF = async () => {

  const { gameVersion, loader } = ModsConfig;
  const loaderType = (loader === 'fabric') ? 4 : 1;
  const modsList_CF = ModsConfig?.modsList_CurseForge;

  const configCF = { headers: { 'x-api-key': process.env.CF_API_KEY } };

  for (const mod of modsList_CF) {
    try {
      const res = await axios.get(`https://api.curseforge.com/v1/mods/${mod.Project_ID}/files?gameVersion=${gameVersion}&modLoaderType=${loaderType}`, configCF);
      const { fileName, downloadUrl: fileURL } = res.data.data[0];
      await downloadMod(fileName, fileURL, environment, configCF);
    }
    catch (err) {
      console.log(`${mod.Mod_Name} Not Available. (or Unknown error)`);
      // console.error(err.message); For debugging purposes
    }
  };
};

if (!fs.existsSync('mods')) {
  fs.mkdirSync('mods', { recursive: true });
}

if (!fs.existsSync('mods/client')) {
  fs.mkdirSync('mods/client', { recursive: true });
}

if (!fs.existsSync('mods/server')) {
  fs.mkdirSync('mods/server', { recursive: true });
}

downloadModrinth("client");
downloadModrinth("server");
downloadCF();