const express = require('express');
const router = express.Router();

const lane_controller = require('../controllers/lane.controller');

/**
 * Создать запись.
 */
router.post('/create', lane_controller.lane_create);

/**
 * Получить список всех записей.
 */
router.get('/', lane_controller.lane_all_details);


/**
 * Изменить запись по id.
 */
router.put('/:id/update', lane_controller.lane_update);
/**
 * Изменить запись по id.
 */
router.put('/:id/move', lane_controller.lane_move);

/**
 * Удалить запись по id.
 */
router.delete('/:id/delete', lane_controller.lane_delete);


router.delete('/board/delete', lane_controller.board_delete);




module.exports = router;