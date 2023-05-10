require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Diet } = require('../../db');

const getApi = async () => {
	const allDiets = [];
	try {
		const { data } = await axios.get(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
		);
		const recipes = data.results.map((recipe) => {
			return {
				id: recipe.id,
				title: recipe.title,
				summary: recipe.summary,
				healthScore: recipe.healthScore,
				image: recipe.image,
				steps: recipe.analyzedInstructions?.map((step) =>
					step.steps.map((step) => {
						return {
							number: step.number,
							step: step.step,
						};
					}),
				),
				diets: recipe.diets.map((diet) => {
					return {
						name: diet,
					};
				}),
				createDb: false,
			};
		});
		recipes.forEach((recipe) => {
			recipe.diets.forEach((diet) => {
				if (!allDiets.includes(diet.name)) {
					allDiets.push(diet.name);
				}
			});
		});
		allDiets.forEach((diet) => {
			Diet.findOrCreate({
				where: {
					name: diet,
				},
			});
		});
		return recipes;
	} catch (error) {
		return { message: error.message };
	}


};

module.exports = getApi;