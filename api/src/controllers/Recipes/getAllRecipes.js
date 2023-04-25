const getDb = require('./getDB');
const getApi = require('./getApi');

const getAllRecipes = async () => {
	const db = await getDb();
	const api = await getApi();
	const recipes = [...db, ...api];
	return recipes;
};

module.exports = getAllRecipes;
