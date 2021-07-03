import Sequelize, { DataTypes } from 'sequelize'
import { db as sequelize } from '../database/connection';

const RecipeStep = sequelize.define('recipeStep', {
    stepID: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    number: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    timestamps: false
});

export default RecipeStep;