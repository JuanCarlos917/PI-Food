const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
	getRecipeId,
	getRecipeByname,
	postRecipe,
} = require('../handlers/Recipes');
const{getDiets} = require('../handlers/Diets')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();
//recipe
router.get('/', getRecipeByname)
router.get('/:id', getRecipeId);
router.post('/', postRecipe);
//diets
router.get('/', getDiets);


module.exports = router;
