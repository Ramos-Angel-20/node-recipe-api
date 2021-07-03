import express, { json } from 'express';
import { connectToDatabase } from './database/connection';
import { config } from 'dotenv';
import cors from 'cors';

// Modelos.
import User from './models/user';
import Recipe from './models/recipe';
import RecipeStep from './models/recipeStep';

config();

const app = express();

// Middlewares.
app.use(json());
app.use(cors());

// Endpoints.
import authRoutes from './routes/auth.routes';
import recipesRouter from './routes/recipes.routes';

app.use('/auth', authRoutes);
app.use('/recipes', recipesRouter);

// Un usuario tiene varias recetas, una receta pertenece un usuario.
User.hasMany(Recipe);
Recipe.belongsTo(User);

// Una receta tiene varios pasos, un paso pertenece a una receta.
Recipe.hasMany(RecipeStep);
RecipeStep.belongsTo(Recipe);


connectToDatabase().then(() => {

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`[SERVER MESSAGE]: Server running on port ${process.env.SERVER_PORT}`);
    });

}).catch((err) => {
    console.log(err);
});

