import { connect, sequelize } from './dbconfig';
import User from '@/models/user.models';
import BlogPost from '@/models/blog.model';


connect();


(async () => {
    await sequelize.sync({ force: false });
    console.log('Database created successfully');
})();