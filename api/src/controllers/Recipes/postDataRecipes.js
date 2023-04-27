const { Recipe, Diet } = require('../../db');

const postDataRecipes = async (recipe) => {
	console.log(recipe);
	let { title, summary, healthScore, image, steps, diets } = recipe;
	let recipeCreated = await Recipe.create({
		title,
		summary,
		healthScore,
		image,
		steps,
	});
	let dietsCreated = await Diet.findAll({
		where: {
			name: diets,
		},
	});

	if (dietsCreated.length > 0) {
		await recipeCreated.addDiet(dietsCreated);
	}
	const result = await Recipe.findOne({
		where: {
			id: recipeCreated.id,
		},
		attributes: [
			'id',
			'title',
			'summary',
			'healthScore',
			'image',
			'steps',
			'createDb',
		],
		include: {
			model: Diet,
			attributes: ['id', 'name'],
			through: {
				attributes: [],
			},
		},
	});
	return result;
};

module.exports = postDataRecipes;
