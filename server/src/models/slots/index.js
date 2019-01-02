const dbClient = require('../../store/db');

const slotsModel = {};

slotsModel.getSlots = (offset = 0, limit = 3) => {
    const query = `
        SELECT *, count(*) OVER() AS full_count
        FROM slots
        WHERE EXTRACT(dow FROM date) NOT IN (0)
        ORDER BY date ASC
        OFFSET $1
        LIMIT $2
    `;

    return dbClient.query(query, [offset * limit, limit]);
};

slotsModel.getFinalSlots = (limit = 3) => {
    const query = `
        SELECT *, count(*) OVER() AS full_count
        FROM slots
        WHERE EXTRACT(dow FROM date) NOT IN (0)
        ORDER BY date DESC
        LIMIT $1
    `;

    return dbClient.query(query, [limit]);
};

slotsModel.selectSlot = (id, time) => {
    const query = `
        UPDATE slots
        SET ${time} = NOT ${time}
        WHERE slots.id = $1
        RETURNING *;
    `;

    return dbClient.query(query, [id]);
};

slotsModel.selectSpecialDelivery = () => {
    const query = `
        UPDATE slots
        SET special_delivery = NOT special_delivery
        WHERE EXTRACT(dow FROM date) IN (3)
        RETURNING *;
    `;

    return dbClient.query(query);
};

module.exports = slotsModel;
