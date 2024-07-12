// Importing sequelize instance from dbConfig
import { sequelize } from '../dbConfig/dbconfig';
import { DataTypes } from 'sequelize';


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken : {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
 
  timestamps: true,
});

export default User;
