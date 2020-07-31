const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    lanes: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Board', BoardSchema);
