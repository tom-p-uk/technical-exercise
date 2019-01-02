const router = require('express').Router();
const slotsRoutes = require('./slots');

router.get('/slots', slotsRoutes.get);
router.put('/slots', slotsRoutes.put);
router.put('/slots/:id', slotsRoutes.putId);

module.exports = router;
