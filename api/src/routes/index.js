const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
	getRecipeId,
	getRecipeByname,
	postRecipe,
} = require('../handlers/Recipes');

const router = Router();

router.get('/', getRecipeByname)
router.get('/:id', getRecipeId);
router.post('/', postRecipe);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
