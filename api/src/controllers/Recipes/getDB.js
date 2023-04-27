const { Recipe, Diet } = require('../../db');

const getDb = async () => {
	const recipes = await Recipe.findAll({
		attributes: [
			'id',
			'title',
			'summary',
			'healthScore',
			'steps',
			'image',
			'createDb',
		],
		include: { model: Diet },
	});

	return await recipes.map(() => {
		return recipes.map(
			({
				dataValues: {
					id,
					title,
					summary,
					healthScore,
					image,
					steps,
					diets,
					createDb,
				},
			}) => ({
				id,
				title,
				summary,
				healthScore,
				image,
				steps,
				diets: diets.map(({ name }) => ({ name })),
				createDb,
			}),
		);
	});
};

module.exports = getDb;
