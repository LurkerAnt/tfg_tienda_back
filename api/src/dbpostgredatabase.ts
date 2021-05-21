import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'postgres',
    'postgres',
    '1234',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
             max: 5,
             min: 0,
             acquire: 30000,
             idle: 10000
         },
        logging:false
    }
    
);

try {
  sequelize.authenticate();
  console.log("connected to:", sequelize.getDatabaseName());
} catch (error) {
  console.error("Unable to connect to the database:", error);
}