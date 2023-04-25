let { Recipe, Diets } = require('../../db');

const postRecipe = async (recipe) => {
	let { title, summary, healthScore, image, steps, diets } = recipe;
	let recipeCreated = await Recipe.create({
		title,
		summary,
		healthScore,
		image,
		steps,
	});
	let dietsCreated = await Diets.findAll({
		where: {
			name: diets,
		},
	});
	recipeCreated.addDiets(dietsCreated);

	const result = await Recipe.findAll({
		where: {
			id: recipeCreated.id,
		},
		include: {
			model: Diets,
			attributes: [
				'id',
				'title',
				'summary',
				'healthScore',
				'steps',
				'image',
				'createDb',
			],
			through: {
				attributes: [],
			},
		},
	});
	return result;
};

module.exports = postRecipe;
