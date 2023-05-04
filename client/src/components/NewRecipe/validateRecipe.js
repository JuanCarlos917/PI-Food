export default function validateRecipe(recipe) {
	const errors = {};

	const regexLettersAndSpaces = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	const regexImageUrl = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;

	if (!recipe.title.trim()) {
		errors.title = 'Please enter the recipe title';
	} else if (!regexLettersAndSpaces.test(recipe.title.trim())) {
		errors.title = 'The title field only accepts letters and blank spaces';
	}

	if (!recipe.summary.trim()) {
		errors.summary = 'Please enter the recipe summary';
	}

	if (!recipe.image.trim()) {
		errors.image = 'Please enter the recipe image URL';
	} else if (!regexImageUrl.test(recipe.image.trim())) {
		errors.image = 'The image URL must start with http:// or https://';
	}

	return errors;
}