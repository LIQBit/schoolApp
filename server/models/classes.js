const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: String,
    year: String
    
});

module.exports = mongoose.model('Class', classSchema);