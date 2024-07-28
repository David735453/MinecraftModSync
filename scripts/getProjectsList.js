const axios = require('axios');
require('dotenv').config();
const ModsConfig = require('../ModsConfig.json');

/**
 * Get list of all followed projects
 * getting followed projects require api key
 */
const getFollowedProjectsModrinth = async () => {

  if (!process.env.MODRINTH_API_KEY) {
    throw new Error('Modrinth API key not defined in env');
  }

  if (!ModsConfig.modrinthUserId) {
    console.error('Modrinth UserId not defined in Config');
    return;
  }

  let res;
  const config = { headers: { 'authorization': process.env.MODRINTH_API_KEY } };
  try {
    res = await axios.get(`https://api.modrinth.com/v2/user/${ModsConfig.modrinthUserId}/follows`, config);
  }
  catch (e) {
    console.log("Verify User ID");
    return;
  }

  const follows = res?.data;
  return follows.filter(o => o.project_type === "mod").map(({ id, slug }) => ({ "Mod_Name": slug, "Project_ID": id }));
};

/**
 * Make sure collection is public
 * 
 * Collection List only contains list of project_ids  
 * 
 * To get the data like slug, it makes another api call
 */
const getCollectionProjects = async (environment) => {
  let res;

  try {
    res = await axios.get(`https://api.modrinth.com/v3/collection/${ModsConfig.modrinthCollectionId?.[environment]}`);
  } catch (e) {
    console.error("Verify modrinth Collection ID");
    return;
  }
  const projects = res?.data?.projects;
  let collectionList = [];

  // Map over the projects array and create an array of promises
  const promises = projects.map(async (p) => {
    const projectData = await axios.get(`https://api.modrinth.com/v2/project/${p}`);
    const { id, slug } = projectData?.data;
    collectionList.push({ "Mod_Name": slug, "Project_ID": id });
  });

  // Wait for all promises to resolve
  await Promise.all(promises);

  return collectionList;
};

const logFollowedProjects = async () => {
  const followsModrinth = await getFollowedProjectsModrinth();
  console.log(followsModrinth);
};

const logCollectionProjects = async () => {
  const followsModrinth = await getCollectionProjects();
  console.log(followsModrinth);
};


/**
 * Check if the module is being run directly  
 * If run directly, then execute these functions
 * 
 * this logs the mod name and mod id in the format defined in ModsConfig
 */
if (require.main === module) {
  logFollowedProjects();
  logCollectionProjects();
}

module.exports = { getCollectionProjects, logFollowedProjects, getFollowedProjectsModrinth };