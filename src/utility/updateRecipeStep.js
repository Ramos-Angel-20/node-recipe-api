import RecipeStep from "../models/recipeStep";

const updateStep = (step) => {

    return new Promise((resolve, reject) => {
        
        RecipeStep.update({
            description: step.description
        }, {
            where: {
                number: step.number,
                RecipeRecipeID: step.RecipeRecipeID
            }
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        });
    });
}

export default updateStep;