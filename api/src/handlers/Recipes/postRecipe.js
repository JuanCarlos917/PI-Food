const postRecipes = require('../../controllers/Recipes/postDataRecipes');

const postRecipe = async (req, res) => {
	const { title, summary, healthScore, steps, image, diets } = req.body;

	try {
		if (title && summary && healthScore && steps && image && diets) {
			const recipeObj = {
				title,
				summary,
				healthScore,
				steps,
				image,
				diets,
			};

			const recipe = await postRecipes(recipeObj);

			return res.status(200).json(recipe);
		}

		res.status(400).json({ message: 'Data missing' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = postRecipe;
