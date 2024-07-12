import { Sequelize } from "sequelize";
import * as pg from 'pg';
let sequelize = new Sequelize(process.env.DB_CONNECTION_STRING!,{
  dialectModule: pg
});

( async () => {
    try {
        await sequelize.authenticate();
        (async () => {
          await sequelize.sync({ force: false });
          console.log('Database created successfully');
      })();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

export {sequelize}