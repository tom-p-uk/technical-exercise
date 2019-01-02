const moment = require('moment');

module.exports = (numToGenerate, makeSlotsAvailable) => {
    const rows = [];

    for (let i = 1; i <= numToGenerate; i++) {
        const row = {
            id: i,
            date: moment().add(i, 'days').format('YYYY-MM-DD'),
            am: makeSlotsAvailable,
            pm: makeSlotsAvailable,
            eve: makeSlotsAvailable,
            special_delivery: false,
            is_second_friday: false,
        };

        rows.push(row);
    };

    return rows;
};
