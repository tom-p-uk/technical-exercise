const slotsModel = require('../../models/slots');
const { DBReadException, DBUpdateException } = require('../../errors');
const slotsService = {};

slotsService.getSlots = (offset, limit) => {
    return slotsModel.getSlots(offset, limit)
        .then(result => {
            if (result.rows.length === parseInt(limit)) {
                return slotsService.removeFirstDayIfNoSlots(result.rows);
            }

            return slotsModel.getFinalSlots(limit)
                .then(result => slotsService.removeFirstDayIfNoSlots(result.rows.reverse()));
        })
        .catch(err => {
            console.log('ERROR:', err);
            throw DBReadException;
        });
};

slotsService.removeFirstDayIfNoSlots = data => {
    const first = data[0];

    if (!first.am && !first.pm && !first.eve) {
        return data.slice(1);
    }

    return data;
};

slotsService.selectSlot = (id, time) => {
    return slotsModel.selectSlot(id, time)
        .then(result => result.rows)
        .catch(err => {
            console.log('ERROR:', err);
            throw DBUpdateException;
        });
};

slotsService.selectSpecialDelivery = (req, res) => {
    return slotsModel.selectSpecialDelivery()
        .then(result => result.rows)
        .catch(err => {
            console.log('ERROR:', err);
            throw DBUpdateException;
        });
};

module.exports = slotsService;
