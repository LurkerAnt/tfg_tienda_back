import { PRIORITY_ABOVE_NORMAL } from 'node:constants';
import Sequelize, { DataTypes } from 'sequelize';
import { sequelize } from '../dbpostgredatabase';

 export const Usuario = sequelize.define('usuario',{
    id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement:true
    },
    nombre: {
         type: Sequelize.STRING,
         allowNull: false 
    },  
    password: {
         type: Sequelize.STRING,
         allowNull: false 
    },
    apellido: {
         type: Sequelize.STRING,
         allowNull: false 
    },   
    email:    {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true 

    },   
    fecha:    {
         type: Sequelize.DATE,
         allowNull: false 
    }, 
    admin:    {
         type: Sequelize.BOOLEAN,
         allowNull: false 

    },
},
    {
        timestamps:false,
        createdAt: false,
        updatedAt: false,      
});

export default Usuario;