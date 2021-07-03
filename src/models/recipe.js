import Sequelize, { DataTypes } from 'sequelize';
import { db as sequelize } from '../database/connection';

const Recipe = sequelize.define('Recipe', {
    recipeID: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Recipe;