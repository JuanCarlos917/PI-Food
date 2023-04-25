const { Diets } = require('../../db');

const getDiets = async () => {
	const diets = await Diets.findAll({
		attributes: ['name', 'id'],
	});

    const dietsAllArray = [];

    diets.forEach((diet) => {
        dietsAllArray.push({
            id: diet.id,
            name: diet.name,
        });
    });

    return dietsAllArray;
};

module.exports = getDiets;
