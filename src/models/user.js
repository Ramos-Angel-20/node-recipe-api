import Sequelize, { DataTypes } from 'sequelize';
import { db as sequelize } from '../database/connection'; 

const User = sequelize.define('User', {
    userID: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false
    }
});

export default User;