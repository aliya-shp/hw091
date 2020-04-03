const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    database: 'mongodb://localhost/chat',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
};