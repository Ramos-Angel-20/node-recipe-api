import { Sequelize } from 'sequelize';

// Creamos la instancia de la conexión con la base de datos. 
export const db =  new Sequelize('recipes_api', 'root', null, {
    dialect: 'mysql',
    host: 'localhost',
});

// Nos conectamos a la base de datos.
export const connectToDatabase = async () => {
    try {
        await db.sync({ force: false });

        console.log('database online');
    
    } catch (error) {
        console.log(error);
    }
}

