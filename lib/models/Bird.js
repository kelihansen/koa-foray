const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    commonName: String,
    scientificName: {
        type: String,
        required: true
    },
    wingspan: String,
    diet: String,
    colors: [String]
});

module.exports = mongoose.model('Bird', schema);