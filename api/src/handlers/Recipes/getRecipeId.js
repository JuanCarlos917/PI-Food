const getRecipeById = require('../../controllers/Recipes/getRecipeById');

const getRecipeId = async (req, res) => {
	try {
		const { id } = req.params;
		const recipe = await getRecipeById(id);
		if (!recipe) {
			return res
				.status(404)
				.json({ message: `The Recipe ${id} not found` });
		} else {
			return res.status(200).json(recipe);
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = getRecipeId;
