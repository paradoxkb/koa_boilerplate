/**
 * Created by watcher on 7/16/18.
 */
const mongoose = require('mongoose');
const { MONGO_URL } = require('./config');

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected successfully');
});

mongoose.connection.on('error', function(err) {
    console.log(`Mongoose connected wrong: ${err}`);
});

module.exports = mongoose.connection;
