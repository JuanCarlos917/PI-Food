const { Diets } = require('../../db');

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

	let allDiets = diets.map((e) =>
		Diets.findOCreate({
			where: {
				name: e,
			},
		}),
	);

	try {
		Promise.all(allDiets).them((e) => console.log('Loader Diets'));
	} catch (error) {
		throw new error(error.message);
	}
};
