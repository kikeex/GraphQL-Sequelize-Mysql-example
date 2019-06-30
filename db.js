const Sequelize = require('sequelize');

const Conn = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});

const Users = Conn.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    code: {
        type: Sequelize.INTEGER,
    },
    password: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
});

// force: true will drop the table if it already exists
Users.sync({ force: true }).then(() => {
    // Table created
    return Users.create({
        id: 1,
        code: 1,
        password: '12345',
        firstName: 'admin',
        lastName: 'admin',
        email: 'support@test.com',
    });
});

export default Conn;
