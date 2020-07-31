const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lane: {
        type: String,
        require: true
    },
    assignee: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Card', CardSchema);
