require('dotenv').config();
const { Recipe, Diet } = require('../../db');
const axios = require('axios');
const { API_KEY } = process.env;

const getRecipeById = async (id) => {
	if (id.includes('-')) {
		try {
			const recipeDB = await Recipe.findByPk(id, {
				include: {
					model: Diet,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			});
			return recipeDB;
		} catch (error) {
			console.log(error);
		}
	} else {
		const response = await axios.get(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
		);
		const recipeApi = {
			id: response.data.id,
			title: response.data.title,
			summary: response.data.summary,
			healthScore: response.data.healthScore,
			image: response.data.image,
			steps: response.data.analyzedInstructions?.[0]?.steps?.map(
				(step) => {
					return {
						number: step.number,
						step: step.step,
					};
				},
			),
			diets: response.data.diets.map((e) => {
				return { name: e };
			}),
		};
		return recipeApi;
	}
};

module.exports = getRecipeById;
