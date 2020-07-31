const express = require('express');
const router = express.Router();

const card_controller = require('../controllers/card.controller');

/**
 * Создать запись.
 */
router.post('/create', card_controller.card_create);

/**
 * Получить список всех записей.
 */
router.get('/', card_controller.card_all_details);

/**
 * Получить запись по id.
 */
router.get('/:id', card_controller.card_details);

/**
 * Изменить запись по id.
 */
router.put('/:id/update', card_controller.card_update);
/**
 * Изменить запись по id.
 */
router.put('/:id/move', card_controller.card_move);

/**
 * Удалить запись по id.
 */
router.delete('/:id/delete', card_controller.card_delete);

module.exports = router;