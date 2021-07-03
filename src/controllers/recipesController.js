import Recipe from "../models/recipe";
import RecipeStep from "../models/recipeStep";
import User from '../models/user';

import updateStep from "../utility/updateRecipeStep";

export const createRecipe = async (req, res) => {

    const { title, description, steps, image } = req.body;

    try {
        const newRecipe = await Recipe.create({
            title,
            description,
            image,
            UserUserID: req.uuid
        });

        // Extraemos el id para crear los steps vinculados a esa receta.
        const { recipeID } = await newRecipe.save();

        // Agregamos el id de la receta a la que pertenecen los pasos.
        for (const step of steps) {
            step.RecipeRecipeID = recipeID;
        }

        const newRecipeSteps = await RecipeStep.bulkCreate(steps);

        res.status(201).json({
            message: 'Recipe created',
            recipe: newRecipe,
            recipeSteps: newRecipeSteps
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Someting went wrong creating the recipe'
        });
    }
}

export const deleteRecipeById = async (req, res) => {
    const { recipeID } = req.params;

    try {
        // Borramos la receta verificando que le pertenezca al usuario del token.
        await Recipe.destroy({
            where: {
                recipeID,
                UserUserID: req.uuid
            }
        });

        // Borramos los pasos de esa receta.
        await RecipeStep.destroy({
            where: {
                RecipeRecipeID: recipeID
            }
        });

        res.status(200).json({
            message: 'Recipe deleted'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Someting went wrong deleting the recipe'
        });
    }
}

export const getFullRecipeById = async (req, res) => {
    const { recipeID } = req.params;

    try {

        const retrivedRecipe = await Recipe.findOne({
            attributes: [
                'title',
                'description',
                'image',
                'updatedAt'
            ],
            where: {
                recipeID
            }
        });

        const retrivedRecipeSteps = await RecipeStep.findAll({
            order: [
                [
                    'number',
                    'ASC'
                ]
            ],
            attributes: [
                'number',
                'description'
            ],
            where: {
                RecipeRecipeID: recipeID
            }
        });

        const recipe = {
            recipeData: retrivedRecipe,
            steps: retrivedRecipeSteps
        };

        res.status(200).json(recipe);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Someting went wrong fetching the recipe'
        });
    }
}

export const updateRecipeById = async (req, res) => {

    const { title, description, steps, image } = req.body;
    const { recipeID } = req.params;

    try {

        const updatedRecipe = await Recipe.update({
            title,
            description,
            image,
            UserUserID: req.uuid
        }, {
            where: {
                recipeID
            }
        });

        // Agregamos el id de la receta a la que pertenecen los pasos y actualizamos los pasos, uno x uno.
        const stepPromises = [];

        for (const step of steps) {
            step.RecipeRecipeID = recipeID;
            stepPromises.push(updateStep(step));
        }

        const stepsResponse = await Promise.all(stepPromises);
        
        res.status(201).json({
            message: 'Recipe successfully updated'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong trying to update the recipe'
        });
    }
}

export const getRecipesByOwner = async (req, res) => {

    const { username } = req.query;

    try {
        // Obtenemos el uuid del username.
        const user = await User.findOne({
            attributes: [
                'userID'
            ],
            where: {
                username: username
            }
        });

        // Buscamos las recetas de ese usuario en base al userID
        const userID = user.dataValues.userID;

        const retrivedRecipes = await Recipe.findAll({
            attributes: [
                'recipeID',
                'title',
                'description',
                'image',
                'updatedAt'
            ],
            where: {
                UserUserID: userID
            }
        });

        res.status(200).json(retrivedRecipes);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: 'Something went wrong creating the recipe'
        });

    }
}



