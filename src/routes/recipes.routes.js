import { Router } from 'express';
import { check } from 'express-validator';
import verifyJwt from '../middlewares/verifyJwt';
import validateFields from '../middlewares/validateFields';

import { createRecipe, deleteRecipeById, getFullRecipeById, updateRecipeById, getRecipesByOwner } from '../controllers/recipesController';

const recipesRouter = Router();

// TODO: Verificar si no hay errores con el renombre de verifyToken.

// Owner viene de los query params
recipesRouter.get('/recipesBy', [
    verifyJwt,
    check('username', 'Username was not provided').notEmpty().isAlphanumeric(),
    validateFields
], getRecipesByOwner);


recipesRouter.get('/:recipeID', [
    verifyJwt,
    check('recipeID', "There's no id provided").notEmpty(),
    validateFields
], getFullRecipeById);


recipesRouter.post('/', [
    verifyJwt,
    check('title', 'You must provide a title for the recipe').notEmpty(),
    check('description', 'You must provide a description for the recipe').notEmpty(),
    check('steps', 'You must provide the steps of the recipe').isArray({ min: 1 }),
    validateFields
], createRecipe);


recipesRouter.delete('/:recipeID', [
    verifyJwt,
    check('recipeID', "There's no id provided").notEmpty(),
    validateFields
], deleteRecipeById);


recipesRouter.put('/:recipeID', [
    verifyJwt,
    check('recipeID', "There's no id provided").notEmpty(),
    validateFields
], updateRecipeById);






export default recipesRouter;