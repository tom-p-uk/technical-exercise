const slotsService = require('../../services/slots');
const slotsRoutes = {};

slotsRoutes.get = (req, res) => {
    const { offset, limit } = req.query;

    return slotsService.getSlots(offset, limit)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send({ error: err.message }));
};

slotsRoutes.putId = (req, res) => {
    const { id } = req.params;
    const { time } = req.body;

    return slotsService.selectSlot(id, time)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send({ error: err.message }));

};

slotsRoutes.put = (req, res) => {
    return slotsService.selectSpecialDelivery()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send({ error: err.message }));
};

module.exports = slotsRoutes;
