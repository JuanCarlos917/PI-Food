const { Diet } = require('../../db');

const loaderDiets = async () => {
	const diets = [
		'gluten free',
		'paleolithic',
		'vegetarian',
		'lacto ovo vegetarian',
		'vegan',
		'pescatarian',
		'primal',
		'whole 30',
		'fodmap friendly',
		'dairy free',
		'ketogenic',
	];

	let allDiets = [];
	for (let i = 0; i < diets.length; i++) {
		allDiets.push(
			Diet.findOCreate({
				where: {
					name: diets[i],
				},
			}),
		);
	}


	try {
		Promise.all(allDiets).them((e) => console.log('Loader Diets'));
	} catch (error) {
		throw new error(error.message);
	}
};

module.exports = loaderDiets;
