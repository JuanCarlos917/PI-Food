const { Diets } = require('../../db');

const getDietsDb = async () => {
	const diets = await Diets.findAll({
		attributes: ['name', 'id'],
	});

	const dietsAllArray = [];

	diets.forEach((diet) =>
		dietsAllArray.push({name: diet.name, id: diet.id }),
	);

	return dietsAllArray;
};

module.exports = getDietsDb;
