const { Recipe, Diets } = require('../../db');

const getDb = async () => {
	try {
		const recipes = await Recipe.findAll({
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
		return await recipes.map((e)=>{
            return {
                id: e.dataValues.id,
                title: e.dataValues.title,
                summary: e.dataValues.summary,
                healthScore: e.dataValues.healthScore,
                image: e.dataValues.image,
                steps: e.dataValues.steps,
                diet: e.dataValues.diet.map((y) => {
                    return {
                        name: y.name,
                    };
                }),
                creteDb: e.dataValues.creteDb,
            }
        })
	} catch (error) {
		return { msg: error.message };
	}
};

module.exports = getDb;
