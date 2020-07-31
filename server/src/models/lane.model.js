const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LaneSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    cards: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Lane', LaneSchema);
