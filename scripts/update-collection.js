require('dotenv').config();

const axios = require('axios');

const ModsConfig = require('../ModsConfig.json');
const { getFollowedProjectsModrinth } = require('./getProjectsList.js');
const { MODRINTH_BASE_URL_V3 } = require('../constants/constants.js');

/**
 * Followed projects are part of private collection.
 * This adds all follwed projects to a public collection defined by user.
 * The collection id is defined in .env file as MODRINTH_COLLECTION_ID.
 */
const updatePublicCollection = async () => {
  const { modrinthCollectionId } = ModsConfig;
  const followedProjects = await getFollowedProjectsModrinth();
  const projectIdList = await followedProjects?.map((o) => o.Project_ID);
  const config = { headers: { authorization: process.env.MODRINTH_API_KEY } };

  try {
    const res = await axios.patch(
      `${MODRINTH_BASE_URL_V3}/collection/${modrinthCollectionId.client}`,
      { new_projects: projectIdList },
      config
    );
    console.log(res.status);
    console.log('Success');
  } catch (e) {
    console.error('Verify Collection ID');
  }
};

updatePublicCollection();
