const Card = require('../models/card.model');
const Lane = require('../models/lane.model');


/**
 * Создать запись.
 */
module.exports.card_create = function (req, res, next) {

    let card = new Card({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        assignee: req.body.label,
        lane: req.body.laneId
    });

    card.save(function (err) {
        if (err) return next(err);
        res.send('Card Created successfully' + card.id);
        Lane.findById(req.body.laneId, function (err, list) {
            if (err) return next(err);
            list.cards.push(card);
            list.save();
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
module.exports.card_all_details = function (req, res) {
    Card.find({}, (err, items) => {
        res.send(items);
    });
}

/**
 * Получить запись по id.
 */
module.exports.card_details = function (req, res, next) {
    Card.findById(req.params.id, function (err, card) {
        if (err) return next(err);
        res.send(card);
    });
};

/**
 * Изменить запись по id.
 */
module.exports.card_update = function (req, res, next) {
    Card.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, card) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

module.exports.card_move = function (req, res, next) {
    Card.findByIdAndUpdate(req.params.id, { $set: req.body.card }, function (err, card) {
        if (err) return next(err);
        res.send('Product updated.');
    });
    Lane.findById(req.body.sourceListId, function (err, list) {
        if (err) return next(err);
        const index = list.cards.indexOf(req.body.card);
        if (index > -1) {
            list.cards.splice(index, 1);
        }
        list.save();
        Lane.findById(req.body.targetListId, function (err, list) {
            if (err) return next(err);
            req.body.card.list = targetListId;
            list.cards.push(card);
            list.save();        
        });
    });
};

/**
 * Удалить запись по id.
 */
module.exports.card_delete = function (req, res, next) {
    Card.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};