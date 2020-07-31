const Board = require('../models/board.model');
const Lane = require('../models/lane.model');
const Card = require('../models/card.model');



/**
 * Создать запись.
 */
module.exports.lane_create = function (req, res, next) {
    let lane = new Lane({
        title: req.body.title,
        cards: []
    });

    lane.save(function (err) {
        if (err) return next(err);
        res.send('Card Created successfully' + lane.id);
        Board.find({}, (err, items) => {
            let board = items[0];
            if (!board)
            {
                board = new Board({
                    title: "DemoBoard",
                    lanes: [ lane.id ]
                });
            } else 
            {
                board.lanes.push(lane.id);
            }

            board.save();
        });
    });
    /*
        Можно создать запись и так:

        let product = new Product({
            name: req.body.name,
            price: req.body.price
        });

        product.save(function (err) {
            if (err) return next(err);
            res.send('Product Created successfully')
        });
    */
};

/**
 * Получить список всех записей.
 */
module.exports.lane_all_details = function (req, res) {
    Lane.find({}, (err, items) => {
        Board.find({}, (err, boards) => {
            let board = boards[0];
            if (!board)
            {
                board = new Board({
                    title: "DemoBoard",
                });
                board.save();
            }
            items.forEach(lane => {
                lane.id = lane._id;
                lane.cards.forEach((card) => {

                });
            });
            res.send({
                title: board.title,
                lanes: items
            });
        });
    });
}

module.exports.lane_update = function (req, res, next) {
    Lane.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, card) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

module.exports.lane_move = function (req, res, next) {
    Board.find({}, (err, boards) => {
        let board = boards[0];
        board.lists = req.body;
        board.save();
    });
};

/**
 * Удалить запись по id.
 */
module.exports.lane_delete = function (req, res, next) {
    console.log("deleting " + req.params.id);
    Lane.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};

module.exports.board_delete = function (req, res, next) {
    Board.find({}, (err, boards) => {
        let board = boards[0];
        Board.findByIdAndRemove(board.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        });
    });
};