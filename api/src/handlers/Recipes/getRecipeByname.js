const getAllRecipes = require('../../controllers/Recipes/getAllRecipes');

const getRecipeByname = async (req, res) => {
	const { name } = req.query;
	try {
		const recipes = await getAllRecipes();

		if (name) {
			let filterRecipe = recipes.filter(({ title }) =>
				title.toLowerCase().includes(name.toLowerCase()),
			);

			filterRecipe.length
				? res.status(200).json(filterRecipe)
				: res.status(400).json({
						message: `No recipes found with title "${name}"`,
				  });
		} else {
			res.status(200).json(recipes);
		}
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving recipes' });
	}
};

module.exports = getRecipeByname;
